<script>

  import {EventBus} from "../../eventBus.js";

  export default {
    name: 'SIGN_UP',
    data() {
      return {
        firstname: '',
        lastname: '',
        age: '',
        email: '',
        pass1: '',
        pass2: ''
      };
    },
    methods: {
      handleSubmit() {
        try {
          let tipo;
          if (this.email.includes('@admin.trento.it')) {
            tipo = 3;
          } else if (this.email.includes('@data.trento.it')) {
            tipo = 2;
          } else {
            tipo = 1;
          }

          fetch(import.meta.env.VITE_APP_API_URL + '/auth/signUp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name_user: this.firstname,
              surname_user: this.lastname,
              age_user: this.age,
              email_user: this.email,
              pass_user: this.pass1,
              type_user: tipo,
              ban_until_date: null,
            }),
          }).then(res => {
            if (res.ok) {
              this.showModal('Utente registrato con successo!');
              this.$router.push('/');
            }
          });
        } catch (err) {
          this.showModal(err);
        }
      },
      showModal(mess) {
        EventBus.$emit('open-global-modal', {
          title: '⚠️Attenzione⚠️',
          message: mess,
        });
      }
    }
  };

</script>

<template>
  <div class="background">
    <img src="https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

    <div class="signup-form">
      <b-form @submit.prevent="handleSubmit">
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account!</p>
        <hr />

        <b-form-group>
          <div class="double">
            <b-input-group-prepend>
              <b-icon icon="person" />
            </b-input-group-prepend>
            <input type="text"
                   class="form_field"
                   v-model="firstname"
                   placeholder="First Name"
                   required
            />
          </div>
        </b-form-group>

        <b-form-group>
          <b-input-group-prepend>
            <b-icon icon="person" />
          </b-input-group-prepend>
          <input type="number"
                 class="form_field"
                 v-model="age"
                 placeholder="Age"
          />
        </b-form-group>

        <b-form-group>
          <b-input-group>
            <b-input-group-prepend>
              <b-icon icon="person" />
            </b-input-group-prepend>
            <input type="text"
                   class="form_field"
                   v-model="lastname"
                   placeholder="Last Name"
                   required
            />
          </b-input-group>
        </b-form-group>

        <b-form-group>
          <b-input-group>
            <b-input-group-prepend>
              <b-icon icon="envelope" />
            </b-input-group-prepend>
            <input type="email"
                   class="form_field"
                   v-model="email"
                   placeholder="Email Address"
                   required
            />
          </b-input-group>
        </b-form-group>

        <b-form-group>
          <b-input-group>
            <b-input-group-prepend>
              <b-icon icon="lock" />
            </b-input-group-prepend>
            <input type="password"
                   class="form_field"
                   v-model="pass1"
                   placeholder="Password"
                   required
            />
          </b-input-group>
        </b-form-group>

        <b-form-group>
          <b-input-group>
            <b-input-group-prepend>
              <b-icon icon="lock" />
              <b-icon icon="check" />
            </b-input-group-prepend>
            <input type="password"
                   class="form_field"
                   v-model="pass2"
                   placeholder="Confirm Password"
                   required
            />
          </b-input-group>
        </b-form-group>

        <button class="reg" type="submit">
          Sign Up
        </button>
      </b-form>

      <div class="text-center">
        Already have an account?
        <router-link to="/">
          Login here
        </router-link>
      </div>
    </div>
  </div>

</template>

<style scoped>

  .background {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .background img {
    position: absolute;
    width: 100%;
    object-fit: fill;
    z-index: -1;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
  }

  .signup-form {
    width: 30%;
    margin: 0 auto;
    padding: 30px 0;
    color: rgb(255, 245, 238);
    background: rgba(104, 85, 224, 1);
    font-family: 'Roboto Light';
    border-radius: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
                0px -4px 6px rgba(0, 0, 0, 0.05),
                4px 0px 6px rgba(0, 0, 0, 0.05),
                -4px 0px 6px rgba(0, 0, 0, 0.05);

    max-width: 550px;
    min-width: 550px;
  }

  .signup-form form {
    color: #999;
    border-radius: 3px;
    margin-bottom: 15px;
    background: rgb(255, 245, 238);
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
    background: rgba(104, 85, 224, 1) !important;
    border: none;
    min-width: 140px;
  }

  .signup-form .btn:hover, .signup-form .btn:focus {
    background: rgba(104, 85, 224, 1) !important;
  }

  .signup-form a {
    color: rgb(255, 245, 238);
    text-decoration: underline;
  }

  .signup-form a:hover {
    text-decoration: none;
  }

  .signup-form form a {
    color: rgba(104, 85, 224, 1);
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
    color: rgb(255, 245, 238);
    left: 17px;
    top: 18px;
    font-size: 7px;
    position: absolute;
  }

  .form_field {
    font-family: 'Roboto Light';
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.3rem;
    color: black;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;


    &:placeholder-shown {
      font-size: 1.3rem;
      cursor: text;
      top: 20px;
    }
  }

  .form_field:focus {
    padding-bottom: 6px;
    font-weight: bold;
    border-width: 3px;
    border-image: linear-gradient(to right,  rgba(104, 85, 224, 1), rgba(104, 85, 224, 1));
    border-image-slice: 1;
  }

  .form_field{
    &:required,&:invalid {
      box-shadow:none;
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 4px;
    font-weight: 600;
    margin: 0 10px;
    width: 200px;
    padding: 10px 0;
    box-shadow: 0 0 20px rgba(115, 99, 238, 0.2);
    transition: 0.4s;
  }

  .reg {
    color: white;
    background-color: rgba(104, 85, 224, 1);
  }

  button:hover {
    color: white;
    box-shadow: 0 0 40px rgba(104, 85, 224, 0.6);
    background-color: rgba(104, 85, 224, 1);
  }

</style>