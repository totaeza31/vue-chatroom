<template >
  <div class="min-h-screen   bg-white">
    <nav class="h-12 bg-gray-50 	">
      <div class="grid grid-cols-3">
        <div class="h-12 flex items-center ml-4	">
        <router-link to="/" class=" text-red ">Sign in</router-link>
        </div>
        <div class="h-12 flex items-center  ml-6">
        <p2 class="text-right" >Message</p2>
        </div>
      </div>
    </nav>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li class="chat-message" v-for="message in messages" :key="message.id">
            <div class="right-bubble" v-if="message.name === name">
              <span class="green-text">{{ message.name }}&nbsp;</span>
              <span class="grey-text text-darken-3">{{ message.content }}</span>
              <span class="grey-text time">{{ message.timestamp | moment }}</span>
            </div>
            <div class="left-bubble right-align" v-if="message.name !== name">
              <span class="green-text">{{ message.name }}&nbsp;</span>
              <span class="grey-text text-darken-3">{{ message.content }}</span>
              <span class="grey-text time">{{ message.timestamp | moment }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="object-bottom	">
        <form @submit.prevent="addMessage" >
          <!-- <label>New Message from {{ name }} (enter to add):</label> -->
          <!-- <input type="text" v-model="newMessage" /> -->
            <input
                  v-model="newMessage"
                  type="text"
                  required 
                  class="appearance-none rounded-t-2xl rounded-b-2xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md  focus:outline-none focus:ring-indigo-500 ring-2  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Messages"
                  
                />
          <p class="red-text" v-if="feedback">{{ feedback }}</p>
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
  props: ["name"],
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
    async addMessage() {
      if (this.newMessage) {
        await db.collection("messagest").add({
          name: this.name,
          content: this.newMessage,
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
.container {
  border-radius: 5px;
}

.messages {
  max-height: 640px;
  overflow: auto;
}
.chat-message {
  width: 80%;
  min-height: 40px;
}
.chat-message .right-bubble {
  position: relative;
  background: #dcf8c6;
  border-top-left-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  padding: 5px 10px 10px;
  margin-bottom: 10px;
  left: 50%;
  width: 70%;
}
#timeme {
  position: relative;

  border-top-left-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  padding: 5px 10px 10px;
  left: 50%;
  width: 70%;
}

.chat-message .right-bubble:after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-left-color: #dcf8c6;
  border-right: 0;
  border-top: 0;
  margin-top: -0.5px;
  margin-right: -27px;
}
.chat-message .left-bubble {
  position: relative;
  background: #efefef;
  border-top-right-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  padding: 5px 10px 10px;
  margin-bottom: 10px;
  left: 5%;
  width: 70%;
}
.chat-message .left-bubble:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-right-color: #efefef;
  border-left: 0;
  border-top: 0;
  margin-top: -0.5px;
  margin-left: -27px;
}
</style>