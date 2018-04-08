<template>
  <div class="row">
    <div class="col">

      <div v-if="!editable">
        <p>{{ info }}</p>
        <button @click="edit()" class="btn btn-secondary float-right">Edit</button>
      </div>
      
      <div v-if="editable">
        <textarea class="form-control" name="help" id="" rows="10" v-model="info"></textarea>
        <button @click="save()" class="btn btn-success float-right mt-2">Done</button>
      </div>

    </div>
  </div>
</template>

<script>
  import APIService from '@/services/APIService'
  
  export default {
    name: "Help",
    data() {
      return {
        editable: false,
        helpData: null,
        info: 'Help'
      };
    },
    created(){
      APIService.getHelpData().then(res => {
        this.helpData = res.data[0]
        if (res.data[0])
          this.info = res.data[0].info
      })
    },
    methods: {
      edit() {
        this.editable = true
        this.info = this.homeData.info
      },
      save() {
        this.editable = false
        if (!this.helpData) {
          APIService.postHelpData({ info: this.info }).then(res => {
            console.log(res)
            this.$notify({
              text: 'Help data saved.',
              type: 'success'
            });
          })
        } else {
          this.helpData.info = this.info
          APIService.updateHelpData(this.helpData).then(res => {
            console.log(res)
            this.$notify({
              text: 'Help data updated',
              type: 'success'
            });
          })
        }
      }
    }
  }
</script>

