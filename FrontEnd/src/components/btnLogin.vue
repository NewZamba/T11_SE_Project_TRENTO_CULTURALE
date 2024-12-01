<script>
import PASS from './password.vue';
import USER from './user.vue';

  export default {
    components: {
      USER,
      PASS
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
            fetch('http://localhost:3000/login', {
              method: 'POST',
              mode: 'no-cors',
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
                  alert('ciao');
                }
                return response.json(); 
              })
            .catch(error => {
              console.error('Errore:', error); 
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

  <USER ref="userComponent" />
  <PASS ref="passComponent" />

  <div class="box">
    <div class="btn btn-one" role="button" @click="loginUtente">
      <span>LOGIN</span>
    </div>
  </div>

</template>

<style scoped> 

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