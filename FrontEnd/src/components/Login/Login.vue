<script>
import PASS from './password.vue';
import USER from './user.vue';
import TITLE from './title.vue';
import BTN_SIGN_UP from '../Sign_Up/SignUpBtn.vue';
import cookie from 'js-cookie';

  export default {
    name: 'BTN_LOGIN',
    components: {
      USER,
      PASS,
      TITLE,
      BTN_SIGN_UP,
    },
    data() {
      return {
        user: '',
        pass: '',
        userLog: {}
      };
    },
    methods: {
      async loginUtente() {

        this.user = this.$refs.userComponent.getUser();
        this.pass =  this.$refs.passComponent.getPass();
        console.log(this.user);
        console.log(this.pass);

        if (this.user && this.pass) {
          try {
            fetch('http://localhost:3000/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: this.user,
                password: this.pass,
              }),
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
                return response.json();
            }).then(data => {
              //setto i coockie
              cookie.set('User', data.user['_id'], {expires: 1});

              switch (data.user['type_user']) {
                case 1:
                  this.$router.push('/UserHome');
                  break;
                case 2:
                  this.$router.push('/DataAnalystHome');
                  break;
                case 3:
                  this.$router.push('/ModeratorHome');
                  break;
                default: alert('Utente non esistente!');
                  break;
              }
              this.userLog = data.user;
            })
            .catch(error => {
              alert(error.message);
            });
          } catch (error) {
            alert(error);
          }    
        }


      }
    }
  };
</script>

<template>

   <div class="login">

      <TITLE />

      <USER ref="userComponent" />
      <PASS ref="passComponent" />

      <div class="box">
        <div class="btn btn-one" role="button" @click="loginUtente">
          <span>LOGIN</span>
        </div>
      </div>

     <BTN_SIGN_UP />

   </div>

</template>

<style scoped>

  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #85daff;
    box-sizing: border-box;
    padding: 20%;
    gap: 20px;
  }

  .box {
    background-color: #85daff;
  }

  .btn {
    line-height: 50px;
    height: 50px;
    text-align: center;
    width: 250px;
    cursor: pointer;
  }

  .btn-one {
    color: #FFF;
    transition: all 0.3s;
    position: relative;
  }

  .btn-one span {
    transition: all 0.3s;
  }

  .btn-one::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    transition: all 0.3s;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-top-style: solid;
    border-bottom-style: solid;
    border-top-color: rgba(255,255,255,0.5);
    border-bottom-color: rgba(255,255,255,0.5);
    transform: scale(0.1, 1);
  }

  .btn-one:hover span {
    letter-spacing: 2px;
  }

  .btn-one:hover::before {
    opacity: 1;
    transform: scale(1, 1);
  }

  .btn-one::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: all 0.3s;
    background-color: rgba(255,255,255,0.1);
  }

  .btn-one:hover::after {
    opacity: 0;
    transform: scale(0.1, 1);
  }
</style>