<template>
    <div class="row">
        <div class="col">
            <div v-if="!editable">
                <p class="font-italic">{{ info }}</p>
                <button @click="edit()" class="btn btn-secondary float-right">Edit</button>
            </div>
    
            <div v-if="editable">
                <textarea class="form-control" name="home" id="" rows="10" v-model="info"></textarea>
                <button @click="save()" class="btn btn-success float-right mt-2">Done</button>
            </div>
        </div>
    </div>
</template>

<script>
    import APIService from '@/services/APIService'
    
    export default {
        name: 'Home',
        data() {
            return {
                homeData: '',
                editable: false,
                info: 'Home'
            }
        },
        created() {
            APIService.getHomeData().then(res => {
                this.homeData = res.data[0]
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
                if (!this.homeData) {
                    APIService.postHomeData({
                        info: this.info
                    }).then(res => {
                        console.log(res)
                        this.$notify({
                            text: 'Home data saved.',
                            type: 'success'
                        });
                    })
                } else {
                    this.homeData.info = this.info
                    APIService.updateHomeData(this.homeData).then(res => {
                        console.log(res)
                        this.$notify({
                            text: 'Home data updated',
                            type: 'success'
                        });
                    })
                }
            }
        }
    }
</script>

<style scoped>
</style>

