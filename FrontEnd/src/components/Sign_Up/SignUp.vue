<script>

  export default {
    name: 'SIGN_UP',
    components: {},
    data() {
      return {
        firstname: '',
        lastname: '',
        email: '',
        pass1: '',
        pass2: '',
        age: '',
        phone: ''
      };
    },
    methods: {
      handleSubmit() {
        //gestione submit
        try {
          let tipo;

          if (this.email.includes('@admin.trento.it')) {
            tipo = 1;
          } else if (this.email.includes('@data.trento.it')) {
            tipo = 2;
          } else {
            tipo = 3;
          }

          fetch('http://localhost:3000/addUser', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name_user: this.firstname,
              surname_user: this.lastname,
              age_user: this.age,
              email_user: this.email,
              pass_user: this.pass1,
              phone_user: this.phone,
              type_user: tipo,
            }),
          }).then(res => {
            if (res.ok) {
              alert('Utente registrato con successo!');
              this.$router.push('/');
            }
          });
        } catch (err) {
          alert(err);
        }
      }
    }
  };

</script>

<template>

  <!--
    obbligatori:
      nome
      cognome
      email
      pass
      conferma pass

    volontari:
      age
  -->

  <div class="signup-form">
    <b-form @submit.prevent="handleSubmit">
      <h2>Sign Up</h2>
      <p>Please fill in this form to create an account!</p>
      <hr />

      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <b-icon icon="person"></b-icon>
          </b-input-group-prepend>
          <b-form-input
              type="text"
              placeholder="First Name"
              required
              v-model="firstname"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <b-icon icon="person"></b-icon>
          </b-input-group-prepend>
          <b-form-input
              type="text"
              placeholder="Last Name"
              required
              v-model="lastname"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <b-icon icon="envelope"></b-icon>
          </b-input-group-prepend>
          <b-form-input
              type="email"
              placeholder="Email Address"
              required
              v-model="email"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <b-icon icon="lock"></b-icon>
          </b-input-group-prepend>
          <b-form-input
              type="password"
              placeholder="Password"
              required
              v-model="pass1"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <b-icon icon="lock"></b-icon>
            <b-icon icon="check"></b-icon>
          </b-input-group-prepend>
          <b-form-input
              type="password"
              placeholder="Confirm Password"
              required
              v-model="pass2"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <b-icon icon="person"></b-icon>
          </b-input-group-prepend>
          <b-form-input
              type="number"
              placeholder="Age"
              required
              v-model="age"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-button type="submit" variant="primary" size="lg">Sign Up</b-button>
    </b-form>
    <div class="text-center">
      Already have an account? <router-link to="/">Login here</router-link>
    </div>
  </div>

</template>

<style scoped>

  .signup-form {
    width: 400px;
    margin: 0 auto;
    padding: 30px 0;

    color: #fff;
    background: #19aa8d;
    font-family: 'Helvetica', sans-serif;
  }

  .signup-form form {
    color: #999;
    border-radius: 3px;
    margin-bottom: 15px;
    background: #fff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
  }

  .signup-form h2 {
    color: #333;
    font-weight: bold;
    margin-top: 0;
  }

  .signup-form hr {
    margin: 0 -30px 20px;
  }

  .signup-form .form-group {
    margin-bottom: 20px;
  }

  .signup-form label {
    font-weight: normal;
    font-size: 15px;
  }

  .signup-form .form-control {
    min-height: 38px;
    box-shadow: none !important;
  }

  .signup-form .input-group-addon {
    max-width: 42px;
    text-align: center;
  }

  .signup-form .btn, .signup-form .btn:active {
    font-size: 16px;
    font-weight: bold;
    background: #19aa8d !important;
    border: none;
    min-width: 140px;
  }

  .signup-form .btn:hover, .signup-form .btn:focus {
    background: #179b81 !important;
  }

  .signup-form a {
    color: #fff;
    text-decoration: underline;
  }

  .signup-form a:hover {
    text-decoration: none;
  }

  .signup-form form a {
    color: #19aa8d;
    text-decoration: none;
  }

  .signup-form form a:hover {
    text-decoration: underline;
  }

  .signup-form .fa {
    font-size: 21px;
  }

  .signup-form .fa-paper-plane {
    font-size: 18px;
  }

  .signup-form .fa-check {
    color: #fff;
    left: 17px;
    top: 18px;
    font-size: 7px;
    position: absolute;
  }

</style>