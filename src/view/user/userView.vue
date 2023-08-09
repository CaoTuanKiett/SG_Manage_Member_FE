<script>
import axios from "axios";
import { computed, defineComponent, onMounted, ref } from "vue";
import Cookies from 'js-cookie';
import {  useRouter } from 'vue-router';



export default defineComponent({
  name: "UserView",
  setup() {
    const userData = ref([]);
    const searchKeyword = ref("");
    const router = useRouter();

    const tableColumns = [
            "user",
            "role",
            "status",
            "last activity",
            "join date",
            "actions",
          ];

    const logout = () => {
      Cookies.remove('auth_token');
    }


    const isLogin = () => {
      const token = Cookies.get('auth_token')
      if (!token) {
        router.push({ name: 'Home' });
      }
    }

    onMounted(() => {
      isLogin();
    });


    const closeAllPopup = () => {
      var popups = document.querySelectorAll('.boxAction');
      let overlay = document.querySelector(".overlay")
      overlay.style.display = "none"
      popups.forEach(p => p.style.display = "none");
    }

    const autoClosePopup = (e) => {
      if (e.target.classList.contains('.boxAction')) return;
      this.closeAllPopup()
      console.log("autoClosePopup");
    }

    const showPopup = (id) => {
      this.closeAllPopup()
      var popup = document.querySelector("#action-" + id)
      let overlay = document.querySelector(".overlay")
      if (popup.dataset.display == "none") {
          popup.style.display = "block"
          popup.dataset.display = "block"
          overlay.style.display = "block"
      } else {
          popup.style.display = "none"
          popup.dataset.display = "none"
          overlay.style.display = "none"
      }
    }

    const onDelete = (id) => {
      this.filterUser(id);
      this.closeAllPopup();
    }

    const filterUser = (id) => {
      this.userData = this.userData.filter(u => u.id !== id)
    };

    const fetchData  = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users");
        return userData.value = response.data;
      } catch (error) {
        return [];
      }
    };

    const filteredUsers = computed(() => {
      
      if (!searchKeyword.value) {
        return userData.value;
      }

      const keyword = searchKeyword.value.toLowerCase();
      return userData.value.filter((user) => {
        return user.name.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword) || user.role.toLowerCase().includes(keyword);
      });
    });

    onMounted(() => {
      fetchData();
    });

    return {
      tableColumns,
      closeAllPopup,
      autoClosePopup,
      showPopup,  
      onDelete,
      filterUser,
      searchKeyword,
      filteredUsers,
      logout,
      router,
    };
  },

});

</script>

<template>
 <div class="box-border p-0 m-0 flex items-center justify-center w-full">
  <div  class="w-3/5 " >

<div class="container-header pt-10 ">

  <label class="relative block">
    <span class="sr-only">Search</span>
    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
      <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><!-- ... --></svg>
    </span>
    <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search" v-model="searchKeyword"/>
  </label>
  
</div>

<div class="container-body" >

  <div 
    class="item-user flex items-center m-6 p-4 justify-around border-solid border-2 rounded-md"
    v-for="user in filteredUsers"
    :key="user.id"
   >
    <!-- <img :src="user.avatar" alt="avt" class="w-24 h-auto rounded-3xl	"> -->
    <h2 class="font-bold text-lg" >{{user.id}}</h2>
    <h3 class="font-bold text-lg" >{{user.name}}</h3>
    <p class="font-medium text-base" >{{user.email}}</p>
    <p  class="font-medium text-base" > {{user.role}} </p>

    <div class="action relative">
    
      <td class="relative">
        <button type="button" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-gray-500 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        @click="showPopup(user.id)"> 
            Actions 
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        
        <div :id="'action-' + user.id" data-display="none" class="boxAction popup hidden absolute right-0 w-32 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
            <div class="px-1 py-1 popup">
                <button class="popup hover:bg-gray-400 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm" 
                @click="closeAllPopup()">
                    <svg xmlns="http://www.w3.org/2000/svg" class="popup w-5 h-5 mr-2 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    Edit 
                </button>
                <button class="popup hover:bg-red-400 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                @click="onDelete(user.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="popup w-5 h-5 mr-2 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> 
                    Delete 
                </button>
            </div>
        </div>
    </td>

    
    </div>

  </div>

  <div @click="closeAllPopup()" class=" hidden overlay  absolute top-0 right-0 left-0 bottom-0"></div>

</div>
<button type="button" class="flex justify-end px-4 py-2 text-sm font-medium text-white rounded-md bg-gray-500 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      @click="logout"
      >
      <router-link to="/" class="text-white">ĐĂNG XUẤT</router-link>
      
    </button>
</div>
  
 </div>
  
</template>