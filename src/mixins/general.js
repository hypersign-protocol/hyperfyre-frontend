export default {
  methods: {
    dateFormat(val, isEdit = false) {
      if (isEdit === true) {
        const value = new Date(val).valueOf();
        if (!isNaN(value)) {
          const dateVal = new Date(value).toISOString().slice(0, 10);
          if (!dateVal) return null;
          const [year, month, day] = dateVal.split("-");
          return `${month}/${day}/${year}`;
        } else {
          return null;
        }
      } else {
        if (!val) return null;
        const [year, month, day] = val.split("-");
        return `${month}/${day}/${year}`;
      }
    },

    copyContent(id) {
      let cb = document.getElementById(id);
      cb.style.display = "block";
      cb.select();
      document.execCommand("copy");
      cb.style.display = "none";
    },

    titleCase(str) {
      var splitStr = str.toLowerCase().split("");
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join("");
    },
  },
};
