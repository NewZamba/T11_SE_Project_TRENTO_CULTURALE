<script>

  export default {
    name: 'createGraphic',
    data() {
      return {
        a: '',
        b: ''
      };
    },
    methods: {
      handleCreation() {
        const arrLabelX = JSON.parse(this.a.replace(/'/g, '"'));
        const arrLabelY = JSON.parse(this.b.replace(/'/g, '"'));



        this.$router.push({
          path: './Data_Analyst',
          query: {
            x: arrLabelX,
            y: arrLabelY
          }
        });
      }
    }
  };

</script>

<template>

  <div class="background">
    <img src="https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

    <div class="signup-form">
      <b-form @submit.prevent="handleCreation">
        <h2>Add Graphic</h2>
        <p>Formato: ['a', 'b', 'c']</p>
        <hr />

        <b-form-group>
          <div class="double">
            <b-input-group-prepend>
              <b-icon icon="arrow-right" />
            </b-input-group-prepend>
            <input type="text"
                   class="form_field"
                   v-model="a"
                   placeholder="Asse X"
                   required />
          </div>
        </b-form-group>

        <hr class="in_hr"/>

        <b-form-group>
          <div class="double">
            <b-input-group-prepend>
              <b-icon icon="arrow-up" />
            </b-input-group-prepend>
            <input type="text"
                   class="form_field"
                   v-model="b"
                   placeholder="Asse Y"
                   required />
          </div>
        </b-form-group>

        <hr class="in_hr"/>

        <button class="graphic_btn" type="submit">
          Add Graphic
        </button>
      </b-form>
    </div>
  </div>

</template>

<style scoped>

  .background {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .background img {
    position: absolute;
    object-fit: cover;
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

  .in_hr {
    width: 100%;
    justify-self: center;
  }

  .graphic_btn {
    border: none;
    width: 120px;
    height: 60px;
    border-radius: 5px;
    border: 1px solid rgba(104, 85, 224, 1);
    background-color: rgb(255, 245, 238);
    color: rgba(104, 85, 224, 1);
    font-size: medium;
    font-family: 'Helvetica', sans-serif;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
  }

  .graphic_btn:hover {
    color: rgb(255, 245, 238);
    background-color: rgba(104, 85, 224, 1);
    transform: scale(1.1);
  }

</style>