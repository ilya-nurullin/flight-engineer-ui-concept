<template lang="pug">
  .indicator(@click="select")
    .light(:class="{ red: clr == 'red', yellow: clr == 'yellow', green: clr == 'green' }")
    .text {{ txt }}
</template>

<script>
  export default {
    props: ['text', 'color', 'is-not-selectable'],
    methods: {
      select: function() {
        if (this.isNotSelectable) return;
        $('.indicator').removeClass('selected');
        $(this.$el).addClass('selected');
        this.$emit('select-indicator', this);
      }
    },
    data: function () {
      return {
        'clr' : this.color,
        'txt': this.text,
        'powerText': "Да",
        'generalStatus': "Всё хорошо"
      }
    },
    mounted() {
      if (this.txt == "D11") {
        setInterval(() => {
          this.clr = (this.clr == "green") ? "yellow": "green";
          this.powerText = (this.clr == "green") ? "Да": "От аккумулятора";
          this.generalStatus = (this.clr == "green") ? "Всё хорошо": "Обрати внимание";
        }, 2000);

      }
      if (this.txt == "F25") {
        this.clr = 'red';
        this.powerText = "Отключен";
        this.generalStatus = "Есть проблемы";
      }
    },
    watch: {
      powerText: function(text) {
        this.$emit('indicatorChanged');
      },
      
    }
  }
</script>

<style lang="scss" scoped>
  .indicator {
    margin: 0.5rem;
    display: inline-block;

    &.selected {
      border: 2px solid #ccc;
    }
  }
  .light {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.5rem;
    
    &.red {
      background: red;
      box-shadow: 0 0 10px 3px red;
    }
    &.yellow {
      background: yellow;
      box-shadow: 0 0 10px 3px yellow;
    }
    &.green {
      background: green;
      box-shadow: 0 0 10px 3px green;
    }
  }
  .text {
    display: inline-block;
    font-size: 20px;
  }
</style>