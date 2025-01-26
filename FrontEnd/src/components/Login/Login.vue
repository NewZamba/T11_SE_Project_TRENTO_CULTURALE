<script>
import PASS from './password.vue';
import USER from './user.vue';
import TITLE from './title.vue';
import BTN_SIGN_UP from '../Sign_Up/SignUpBtn.vue';
import Cookies from 'js-cookie';

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
      };
    },
    methods: {
      async loginUtente() {
        this.user = this.$refs.userComponent.getUser();
        this.pass =  this.$refs.passComponent.getPass();
        if (this.user && this.pass) {
          try {
            const response = await fetch('http://localhost:3000/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                email_user: this.user,
                pass_user: this.pass,
              }),
            });

            if (!response.ok) {
              throw new Error('email o password errata');
            }

            const data = await response.json();
            switch (data.type_user) {
              case 1:
                await this.$router.push('/UserHome');
                break;
              case 2:
                await this.$router.push('/DataAnalystHome');
                break;
              case 3:
                await this.$router.push('/ModeratorHome');
                break;
              default:
                throw new Error('type_user non esistente');
            }
          } catch (error) {
            alert(error.message);
          }
        } else {
          alert('email o password non inserita');
        }
      },
      async loginGoogle() {
        try {
          const response = await fetch('http://localhost:3000/auth/google', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Errore nel Login con Google!');
          }

          const data = await response.json()

          switch (data.type_user) {
            case 1:
              await this.$router.push('/UserHome');
              break;
            case 2:
              await this.$router.push('/DataAnalystHome');
              break;
            case 3:
              await this.$router.push('/ModeratorHome');
              break;
            default:
              throw new Error('type_user non esistente');
          }
        } catch (error) {
          alert(error.message);
        }






          // fetch('http://localhost:3000/auth/google', {
          //   method: 'GET',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   }
          // }).then (response => {
          //   if (!response.ok) {
          //     alert('Errore nel Login con Google!');
          //     this.$router.push('/');
          //   } else {
          //     this.$router.push('/UserHome');
          //     return response.json();
          //   }
          // })
      }
    },
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

     <form action="http://localhost:3000/auth/google" method="get">
       <input type="submit" value="Press to log in"/>
     </form>

<!--     <div class="box">-->
<!--       <div class="btn btn-one" role="button" @click="loginGoogle">-->
<!--         <span>LOGIN WITH GOOGLE</span>-->
<!--       </div>-->
<!--     </div>-->

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

  .google-button {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  .google-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

</style>