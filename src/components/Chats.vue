<template >
  <div class="min-h-screen   bg-white">
    <nav class="h-12 bg-gray-50 	">
      <div class="grid grid-cols-3">
        <div class="h-12 flex items-center ml-4	 text-blue-700	">
          <i class="fas fa-angle-left"></i>


        <router-link to="/" class=" text-red ">Sign in</router-link>
        </div>
        <div class="h-12 flex items-center  ml-6">
        <p2 class="text-right" >Message</p2>
        </div>
      </div>
    </nav>
    <div class="">
      <div class="">
        <ul class="messages" v-chat-scroll>
          <li class="" v-for="message in messages" :key="message.id">

            <div  class="text-right mr-4" v-if="message.name === name && message.roomName === room">
             
              <div  >
              <span class="text-xs	 ">{{ message.timestamp | moment }}  {{ message.name }}</span>
              </div>
              <div  class=" flex justify-end ml-10  ">
              <button @click ='deleteMessage(message.id)' class="p4"><i class="fas fa-trash-alt"></i>

</button>
              <span class="bg-green-500 p-4 ml-1 	rounded-t-2xl  rounded-l-2xl	">{{ message.room }}{{ message.content }}</span>
            </div>
</div>


            <div class="ml-4" v-if="message.name !== name  && message.roomName === room">
               <div >
              <span class=" text-xs 	">{{ message.timestamp | moment }}  {{ message.name }}</span>
              </div>
                <div class=" flex " >
              <span class="bg-gray-400	 p-4	mr-10  	rounded-t-2xl  rounded-r-2xl ">{{ message.content }}</span>
              </div> 
            </div>
          </li>
        </ul>
      </div>
      <div class="  object-bottom 	">
        <form @submit.prevent="addMessage" >
          <!-- <label>New Message from {{ name }} (enter to add):</label> -->
          <!-- <input type="text" v-model="newMessage" /> -->
          <div class="grid grid-cols-8 gap-4">
            <input
                  v-model="newMessage"
                  type="text"
                  required 
                  class="appearance-none rounded-t-2xl rounded-b-2xl col-span-7 relative block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md  focus:outline-none focus:ring-indigo-500 ring-2  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Messages"
                  
                />  <button class="mr-4" name="button"><i class="fas fa-paper-plane"></i>

</button>
          <p class="red-text" v-if="feedback">{{ feedback }}</p>

                  
</div>
          <!-- <button class="btn green" name="button">Add</button> -->
        </form>
      </div>
      </div>
    </div>
</template>

<script>
import { db } from "@/main";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "Chat",
  props: ["name","room"],
  data() {
    return {
      
      newMessage: null,
      feedback: null,
    };
  },
  computed: mapState(["messages"]),
  mounted() {
    this.getMessage();
  },
  filters: {
    moment: function (data) {
      return moment(data).format("lll");
    },
  },
  methods: {
    getMessage() {
      this.$store.dispatch("loadMessage");
    },
    deleteMessage(doc){
if(confirm('Are you sure ?')){
  db.collection("messagest").doc(doc).delete().then(function(){
      console.log("Document successfully deleted!");
  }).catch(function(error){
    console.log("Error removing documrnt:",error);
  });
}
    },
    async addMessage() {
     
      if (this.newMessage) { 
        await db.collection("messagest").add({
          name: this.name,
          content: this.newMessage,
          roomName: this.room,
          timestamp: Date.now(),
        });
        (this.newMessage = ""), (this.feedback = "");
      } else {
        this.feedback = "You must enter a message";
      }
    },
  },
};
</script>
<style>
.messages {
  max-height: 640px;
  overflow: auto;
}
#right{
 margin-right: auto;
}
</style>