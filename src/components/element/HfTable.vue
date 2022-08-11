<template>
  <div
    class="row g-3 w-100"
    style="padding: 10px; max-height: 300px; overflow-y: auto"
   
  >
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"
          v-for="(header, index) in headers" :key="index"
          >{{header}}</th>
        </tr>
      </thead>
      <tbody v-for="row in tableBody" :key="row">
        <tr >
          <!-- <td>
            {{ coupon.name }}
            <span @click="copy(coupon.index, 'Coupon Code')" class="copy"
              ><i class="far fa-copy"></i
            ></span>
          </td> -->
          <td v-for="key in Object.keys(row)" :key="key">{{ row[key] }} 
          </td>
          <!-- <td v-for="key in Object.keys(row)" :key="key">{{ row[key]  }}</td> -->
     
          <td>
            <span>
              <i
                class="fas fa-pencil-alt"
                style="padding: 2px; cursor: pointer"
                title="Click to edit the coupon"
                @click="updateCoupon(coupon)"
              >
              </i>
            </span>

            <span>
              <i
                class="fas fa-trash"
                style="padding: 2px; cursor: pointer"
                title="Click to delete the coupon"
                @click="removeCoupon(coupon)"
              >
              </i>
            </span>
          </td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tableBody: {
      type: Array,
    },
    headers:{
    type: Array
  },
  },
  computed:{
   
    // isAction(row){
    //   if(row[key].includes("discount")){
    //     console.log(row[key])
    //   }
    // }
    // tableBody(){
      // const temp = tableBody
      // console.log(temp)
      // return tableBody= temp.push(`<span>
      //         <i
      //           class="fas fa-pencil-alt"
      //           style="padding: 2px; cursor: pointer"
      //           title="Click to edit the coupon"
      //           @click="updateCoupon(coupon)"
      //         >
      //         </i>
      //       </span>

      //       <span>
      //         <i
      //           class="fas fa-trash"
      //           style="padding: 2px; cursor: pointer"
      //           title="Click to delete the coupon"
      //           @click="removeCoupon(coupon)"
      //         >
      //         </i>
      //       </span>`)
            // }
  },
  methods: {
    removeCoupon(coupon) {
      this.$emit("removeCoupon",coupon);
      console.log(coupon)
    },
    updateCoupon(coupon){
      this.$emit("updateCoupon",coupon)
    }
  },
};
</script>

<style></style>
