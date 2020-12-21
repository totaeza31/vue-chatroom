<template>
  <div >
    <form @submit.prevent="enterChat">
      <div>
        <nav class="h-14 bg-white">
          <div class="text-5xl">
            <p2>Sign In</p2>
          </div>
        </nav>
        <main class="bg-white">
          <div
            id="nav"
            class="min-h-screen flex items-center justify-center mx-4 bg-white py-20 px-4 sm:px-6] lg:px-8"
          >
            <div class="max-w-md w-full space-y-8">
              <div id="inside" class="rounded-md -space-y-px">
                <!-- name -->
                <h5 id="texts" class="text-left mx-3 mb-2 text-xs">
                  ENTER YOUR NICKNAME:
                </h5>
                <label for="first_name" class="sr-only">Enter your name:</label>
                <input
                  v-model="name"
                  name="first_name"
                  type="text"
                  required
                  class="appearance-none rounded-t-2xl rounded-b-2xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Steve Jobs"
                />
                <p2 v-if="feedback">{{ feedback }}</p2>

                <!-- room -->

                <h5 id="texts2" class="text-left mx-3 text-xs">
                  CHAT TOPIC
                </h5>
                <label for="first_name" class="sr-only">Enter your name:</label>
                <input
                  name="first_name"
                  type="text"
                  required
                  class="appearance-none rounded-t-2xl rounded-b-2xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="TAILWIND"
                />

                <p2 v-if="feedback">{{ feedback }}</p2>
                <button class="btn green">Enter Chat</button>

                <!-- Replace with your content -->

                <!-- <div
                class=" "  >
                    <h4>Enter your name:</h4>
      <input type="text" v-model="name" />
      <p2 v-if="feedback">{{ feedback }}</p2>
      <button class="btn green">Enter Chat</button>
              </div> -->
              </div>
            </div>
          </div>
        </main>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: null,
      feedback: null,
    };
  },
  methods: {
    enterChat() {
      if (this.name) {
        this.$router.push({ name: "Chat", params: { name: this.name } });
      } else {
        this.feedback = "You must enter a name to join";
      }
    },
  },
};
</script>

<style >
p2 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;
  font-weight: bold;
}
#nav {
  margin-top: 2px;
}
#inside {
  margin-top: -180px;
}
#texts2{
  margin-top:10px;
  margin-bottom: 10px;
}

</style>