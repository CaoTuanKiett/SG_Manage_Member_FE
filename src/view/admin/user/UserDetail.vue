
<script setup>

  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import { notify } from '@kyvg/vue3-notification';

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
    if (userId != 0){
      getUser(userId);
    }
  });


  const saveUser = () => {
    if(validate()){
      if(userId != 0){
        axios
        .put(`http://localhost:3000/api/v1/users/${userId}`, DataUser.value)
        .then((response) => {
          console.log(response);
          notify({
            type: 'success',
            title: 'Update success',
            text: 'Update success',
          });
          Cancel();
        })
        .catch((error) => {
          console.log(error);
        });
      }
      
        axios
        .post(`http://localhost:3000/api/v1/users`, DataUser.value)
        .then((response) => {
          console.log(response);
          notify({
            type: 'success',
            title: 'Create success',
            text: 'Create success',
          });
          Cancel();
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
 
  <div class="px-20 py-10">
    <div class="w-20  cursor-pointer flex items-center">
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
      <button
        class="btn-SignUp hover:opacity-90 w-10 text-[var(--color-primary)] font-bold border-b-2 border-[var(--color-primary)] text-left ml-1 "
        @click="Cancel()"
      >
        Back
      </button>
    </div>

    <div class="flex ">

      <form  
          @submit.prevent="saveUser()"
          class=" w-3/5 pr-20"
          >
            
            <div  class=" w-full">
          
            <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Họ và tên:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="name" 
                v-model="DataUser.name"
                type="text" 
                placeholder="name"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.name}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.name" > {{errorValue.name }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div>
  
            <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Emai:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="email" 
                v-model="DataUser.email"
                type="text" 
                placeholder="email"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.email}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.email" > {{errorValue.email }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div>
  
            <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Số điện thoại:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="phone" 
                v-model="DataUser.phone"
                type="text" 
                placeholder="phone"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.phone}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.phone" > {{errorValue.phone }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div>
  
            <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Địa chỉ:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="address" 
                v-model="DataUser.address"
                type="text" 
                placeholder="address"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.address}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.address" > {{errorValue.address }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div>
  
            <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Quyền truy cập:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="role" 
                v-model="DataUser.role"
                type="text" 
                placeholder="role"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.role}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.role" > {{errorValue.role }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div>
  
        
  
          <div class="flex justify-center mt-6 w-3/4">
              <button type="submit"  class="btn-SignIn hover:opacity-90 bg-[var(--color-primary)] text-white font-bold py-2 px-10 rounded mr-8">
                Cập nhật thông tin
              </button>
            </div>
        </div>
      </form>
  
      <div class="w-2/5 flex justify-start items-center">
        <img 
          src="../../../assets/img/dog.jpg" 
          alt=""
          class="w-[500px] h-[600px] rounded-3xl shadow-xl "
          >
      </div>
    </div>

  </div>

 

 
</template>


