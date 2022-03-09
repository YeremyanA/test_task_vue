<template>
  <div class="reg_page">
    <router-link to="/login">Login</router-link>
    <ValidationObserver slim ref="reg_validation" v-slot="{ handleSubmit }">
      <form autocomplete="off" @submit.prevent="handleSubmit(register)">
        <div class="container">
          <ValidationProvider name="name" rules="required" v-slot="{ errors }">
            <label for="uname"><b>Name</b></label>
            <input type="text" v-model="name" placeholder="name" name="name" />

            <span class="field_error" v-if="errors">{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <label for="uname"><b>Email</b></label>
            <input
              type="text"
              v-model="email"
              placeholder="Email"
              name="email"
            />

            <span class="field_error" v-if="errors">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            name="password"
            rules="required"
                 vid="confirm"
            v-slot="{ errors }"
          >
            <label for="password"><b>Password</b></label>
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              name="password"
            />
            <span class="field_error" v-if="errors">{{ errors[0] }}</span>
          </ValidationProvider>

          <button type="submit">Register</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>

export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async register() {
      const reg_data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      const { data } = await this.$axios.post("/register", reg_data);

      localStorage.setItem("token", data.access_token);

      await this.$router.push({name : 'Home'});
    },
  },
};
</script>

<style scoped>
form {
  border: 3px solid #f1f1f1;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

.reg_page {
  width: 50%;
  margin: auto;
}

.field_error {
  color: red;
}

.container > span {
  display: block;
}
</style>