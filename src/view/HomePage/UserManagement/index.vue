<template>
  <div>
    <div style="width: 79rem;margin: 2.6rem 6.41rem 2.63rem 5.06rem;background: white">
      <div class="user-all">
        <Personal/>
        <Manage v-if="this.jurisdiction==0" />
        <Pwd/>
      </div>
    </div>
  </div>
</template>

<script>
import Manage from '../../../components/UserManagement/Manage'
import Personal from '../../../components/UserManagement/Personal'
import Pwd from '../../../components/UserManagement/Pwd'
export default {
  name: "index",
  components:{Manage,Personal,Pwd},
  data(){
    return{
      jurisdiction:JSON.parse(localStorage.getItem('bdi_iot_user')).jurisdiction
    }
  }
}
</script>

<style scoped>
.user-all{
  padding: 3rem 3rem 3rem 3rem;
}
</style>