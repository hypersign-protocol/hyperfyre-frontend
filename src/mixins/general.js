export default {
  methods: {
    calculateInPercentage(completed, total) {
      let res = 0;
      res = (completed / total) * 100;
      return res;
    },

    dateFormat(val) {
      if (!val) return null;
      const [year, month, day] = val.split("-");
      return `${month}/${day}/${year}`;
    },

    copyContent(id) {
      console.log(id);
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

    positiveNumber: (v) => {
      if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
      return "Please enter a positive number between 0 and 999";
    },
  },
};
