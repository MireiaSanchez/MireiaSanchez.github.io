Vue.config.devtools = true;
var eventBus = new Vue();

var app = new Vue({
  el: "#app",
  data() {
    return {
      kanjis: [],
      activeCharacter: "",
      activeCharacterComments: []
    };
  },
  methods: {
    changeCharacter(index) {
      this.addComments(index);
      this.activeCharacter = this.kanjis[index].kanji.character;
    },
    addComments(index){
      if(this.kanjis[index].kanji.hasOwnProperty('comments')){
        this.activeCharacterComments = this.kanjis[index].kanji.comments;
      } else {
        this.activeCharacterComments= []
      }
    }
  },
    created() {
    fetch(
      "https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/?grade=1",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "2cfecbbd8fmsh3d5547dcdf1807ap194a87jsn1f36f8290607",
          "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.kanjis = data;
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  mounted(){
    
    eventBus.$on('comment-submitted', comment => {
      debugger;
      found= false;
      counter= 0;
      do{
        if(this.activeCharacter == this.kanjis[counter].kanji.character){
          found=true;
          if(this.kanjis[counter].kanji.hasOwnProperty('comments')){
            this.kanjis[counter].kanji.comments.push(comment);
          }else{
            this.kanjis[counter].kanji['comments']=[comment];
          }
          this.addComments(counter);
        }
        counter++;
      }while(!found || counter < this.kanjis.length)

      
    })
  }
})


// DETALLE KANJI
Vue.component("detail", {
  props: {
    activecharacter: {
      type: String,
      required: true
    },
    comments:{
      type: Array,
      required: true
    }
  },
  data() {
    return {
      kunyomi: "",
      meaning: "",
      animation: "",
      strokes: ""
    };
  },
  template: `
        <div class="detail" :class="strokesClass"><img class="image" :src="this.image">
        <div class="info">
        <div v-if="kunyomi.hiragana != 'n/a'">{{this.kunyomi.hiragana}}</div>
        <div v-if="kunyomi.romaji != 'n/a'">{{howToRead}}</div>
            <div>{{englishMeaning}}</div>
            </div>
            <div>   
            <div v-if="this.comments.length> 0">
            <p>How to study suggestions: </p>
            <div class="comment" v-for="comment in comments">{{comment}}</div>
            </div>
            <studyForm></studyForm>
            </div>
        </div>
    `,
  watch: {
    activecharacter() {
      fetch(
        encodeURI(
          `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${this.activecharacter}`
        ),
        {
          method: "GET",
          headers:{
            "x-rapidapi-key":
              "2cfecbbd8fmsh3d5547dcdf1807ap194a87jsn1f36f8290607",
            "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.kunyomi = data.kanji.kunyomi;
          this.meaning = data.kanji.meaning;
          this.image = data.kanji.video.poster;
          this.strokes = data.kanji.strokes.count;
        })
        .catch((err) => {
          console.error(err);
        });

        

    },
  },
  computed: {
    howToRead(){
      return "How to pronounce: "+ this.kunyomi.romaji;
    },
    englishMeaning(){
      return "English meaning: "+ this.meaning.english;
    },
    strokesClass(){
      let classe;
      if(this.strokes > 7){
        classe  = "red"
      } else if (this.strokes > 5) {
        classe  = "yellow"
      } else {
        classe = "blue"
      }

      return classe;
    }
  }
});

Vue.component('studyForm', {
  data (){
    return {
      errors: [],
      comment:""
    }
  },
  template:`
    <form @submit.prevent="onSubmit">
    <p v-if="errors.length">
    Please correct the following errors!
    <ul>
        <li v-for="error in errors">{{ error }}</li>
    </ul>
</p>

<div class="form">
  <label for="comment">Comment any tip to study this kanji:</label>
  <textarea id="coment" v-model="comment" rows="4" cols="30"></textarea>
</div>

<p>
<input type="submit" value="Submit">  
</p>
    </form>
  `,
  methods: {
    onSubmit() {
        if(this.comment){
                let comment= this.comment;
                console.log(comment)
        eventBus.$emit('comment-submitted', comment)
        this.comment = null
        } else {
            if(!this.comment) this.errors.push('Comment required!');
      }
}
  }
})

