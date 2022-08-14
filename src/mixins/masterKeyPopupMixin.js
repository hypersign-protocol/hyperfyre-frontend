export default{
    methods:{
       async masterPop(){
           let masterKey;
            await this.$swal
                .fire({
                    html: `
            <div><b style="color:red">Enter Master Key To Execute</div>
            <input type="password" id="name" class="swal2-input" placeholder="***************">`,
                    confirmButtonText: '<span style="color:white">Confirm</span>',
                    confirmButtonColor: "red",
                    icon: "warning",
                    focusConfirm: false,
                    showCloseButton: true,
                    allowOutsideClick: false,
                    preConfirm: () => {
                        masterKey = this.$swal.getPopup().querySelector("#name").value;
                        if (masterKey === "") {
                            this.$swal.showValidationMessage(`Please enter the master key to proceed`);
                        }
                        return { masterKey };
                    },
                    
                })
                return masterKey;
        }
    }
}