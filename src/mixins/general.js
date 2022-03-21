export default {
  methods: {
    dateFormat(val) {
      if (!val) return null;
      const [year, month, day] = val.split("-");
      return `${month}/${day}/${year}`;
    },
  },
};
