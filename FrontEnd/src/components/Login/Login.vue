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

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message || 'Server error');
            }

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
      }
    },
  };
</script>

<template>

  <div class="background">
    <img src="https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

    <div class="container">
      <div class="login">
        <USER ref="userComponent" />
        <PASS ref="passComponent" />

        <div>
          <button class="log" @click="loginUtente">Login In</button>
        </div>

        <BTN_SIGN_UP />

        <form action="http://localhost:3000/auth/google" method="get" class="logGoogle">
          <input type="submit" value="G">
        </form>
      </div>

      <div class="info">
        <TITLE />
      </div>
    </div>
  </div>

   <!-- <div class="login">

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

   </div>-->

</template>

<style scoped>

  /*.login {
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
  }*/

  .background {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: 100%;
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

  .container {
    padding: 0;
    display: flex;
    flex-direction: row;
    height: 70%;
    width: 70%;
    justify-content: center;
    align-items: center;
    border: 3px;
    border-radius: 30px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
                0px -4px 6px rgba(0, 0, 0, 0.1),
                4px 0px 6px rgba(0, 0, 0, 0.1),
                -4px 0px 6px rgba(0, 0, 0, 0.1);
    background-color: rgb(255, 245, 238);
    z-index: 1;
  }

  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: 20px;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: auto;
    flex: 1;
    background-color:  rgba(104, 85, 224, 1);
    border-bottom-right-radius: 30px;
    border-top-right-radius: 30px;
  }

  .logGoogle {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
                0px -4px 6px rgba(0, 0, 0, 0.1),
                4px 0px 6px rgba(0, 0, 0, 0.1),
                -4px 0px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: box-shadow 0.2s ease;
  }

  .logGoogle:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
                0px -4px 6px rgba(0, 0, 0, 0.1),
                4px 0px 6px rgba(0, 0, 0, 0.1),
                -4px 0px 6px rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }

  .logGoogle input{
    background: none;
    border: none;
    color:  white;
    font-family: "Roboto Light", sans-serif;
    font-size: 30px;
    font-weight: bold;
    -webkit-text-stroke: 2px rgba(104, 85, 224, 1);
    cursor: pointer;
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

  button:hover {
    color: white;
    box-shadow: 0 0 40px rgba(104, 85, 224, 0.6);
    background-color: rgba(104, 85, 224, 1);
  }

  .log {
    color: rgb(104, 85, 224);
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(104, 85, 224, 1);
  }

</style>