
<script setup>

  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter();
  const route = useRoute();
  const userId = route.params.id;

  const DataUser = ref({
    id: "",
    name: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    id_account: "",
    created_at: "",
    created_by: "",
  });

  const errorValue = ref({
    name: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    id_account: "",
    created_at: "",
    created_by: "",
  });

  const validate = () => {
    let isValue = true;
    if (DataUser.value.name == "") {
      isValue = false;
      errorValue.value.name = "Name is required";
    } else {
      errorValue.value.name = "";
    }

    if (DataUser.value.email == "") {
      isValue = false;
      errorValue.value.email = "Email is required";
    } else {
      errorValue.value.email = "";
    }

    if (DataUser.value.role == "") {
      isValue = false;
      errorValue.value.role = "Role is required";
    } else {
      errorValue.value.role = "";
    }

    if (DataUser.value.phone == "") {
      isValue = false;
      errorValue.value.phone = "Phone is required";
    } else {
      errorValue.value.phone = "";
    }

    if (DataUser.value.address == "") {
      isValue = false;
      errorValue.value.address = "Address is required";
    } else {
      errorValue.value.address = "";
    }

    return isValue;
  }
  



  const getUser = (id) => {
   axios
      .get(`http://localhost:3000/api/v1/users/${id}`)
      .then((response) => {
        const data = response.data[0];
        console.log(data);

        DataUser.value.id = data.id;
        DataUser.value.name = data.name;
        DataUser.value.email = data.email;
        DataUser.value.role = data.role;
        DataUser.value.phone = data.phone;
        DataUser.value.address = data.address;
        DataUser.value.id_account = data.id_account;
        DataUser.value.created_at = data.created_at;
        DataUser.value.created_by = data.created_by;

      })
      .catch((error) => {
        console.log(error);
      });
  };


  onMounted( async () => {
    console.log("id", userId);
    if (userId){
      getUser(userId);
    }
  });


  const saveUser = () => {
    if(validate()){
      if(userId){
        axios
        .put(`http://localhost:3000/api/v1/users/${userId}`, DataUser.value)
        .then((response) => {
          console.log(response);
          alert("Update success");
        })
        .catch((error) => {
          console.log(error);
        });
      }
      
        axios
        .post(`http://localhost:3000/api/v1/users`, DataUser.value)
        .then((response) => {
          console.log(response);
          alert("Create success");
        })
        .catch((error) => {
          console.log(error);
        });
      
    }
  };

  const Cancel = () => {
    router.push({ name: 'UserView' });
  }

</script>


<template>
  <form  
    @submit.prevent="saveUser()"
   class=" w-1/3 shadow-2xl border-2 rounded-md py-8 px-10"
  >
    <div  class=" w-full">
  
   <div class="input  p-2 rounded mb-4" >
     <label for="" class="text-base text-black font-bold">Name</label>
     <input 
       class="focus:outline-none placeholder:text-slate-500 w-full border-2" 
       name="name" 
       v-model="DataUser.name"
       type="text" 
       placeholder="name"
       @blur="validate()"
        :class="{'is-invalid': errorValue.name}"
       />

       <div class="invalid-feedback text-left" v-if="errorValue.name" > {{errorValue.name }} </div>
   </div>

   <div class="input  p-2 rounded mb-4" >
     <label for="" class="text-base text-black font-bold">Emai</label>
     <input 
       class="focus:outline-none placeholder:text-slate-500 w-full border-2" 
       name="email" 
       v-model="DataUser.email"
       type="text" 
       placeholder="email"
       @blur="validate()"
        :class="{'is-invalid': errorValue.email}"
       />

       <div class="invalid-feedback text-left" v-if="errorValue.email" > {{errorValue.email }} </div>
   </div>

   <div class="input  p-2 rounded mb-4" >
     <label for="" class="text-base text-black font-bold">Phone</label>
     <input 
       class="focus:outline-none placeholder:text-slate-500 w-full border-2" 
       name="phone" 
        v-model="DataUser.phone"
       type="text" 
       placeholder="phone"
       @blur="validate()"
        :class="{'is-invalid': errorValue.phone}"
       />

       <div class="invalid-feedback text-left" v-if="errorValue.phone" > {{errorValue.phone }} </div>
   </div>

   <div class="input  p-2 rounded mb-4" >
     <label for="" class="text-base text-black font-bold">Address</label>
     <input 
       class="focus:outline-none placeholder:text-slate-500 w-full border-2" 
       name="address" 
        v-model="DataUser.address"
       type="text" 
       placeholder="address"
       @blur="validate()"
        :class="{'is-invalid': errorValue.address}"
       />

       <div class="invalid-feedback text-left" v-if="errorValue.address" > {{errorValue.address }} </div>
   </div>

   <div class="input  p-2 rounded mb-4" >
     <label for="" class="text-base text-black font-bold">Role</label>
     <input 
       class="focus:outline-none placeholder:text-slate-500 w-full border-2" 
       name="role" 
        v-model="DataUser.role"
       type="text" 
       placeholder="role"
       @blur="validate()"
        :class="{'is-invalid': errorValue.role}"
       />

       <div class="invalid-feedback text-left" v-if="errorValue.role" > {{errorValue.role }} </div>
   </div>

   <div class="flex justify-between mt-6 w-full">
      <button type="submit"  class="btn-SignIn hover:opacity-90 bg-blue-800 text-white font-bold py-2 px-4 rounded w-full mr-8">
        Save
      </button>

      <button 
        type="reset"  
        class="btn-SignUp hover:opacity-90 bg-blue-800 text-white font-bold py-2 px-4 rounded w-full"
        @click="Cancel()"
      >
        Cancel
      </button>
    </div>
 </div>
  </form>
 

 
</template>


