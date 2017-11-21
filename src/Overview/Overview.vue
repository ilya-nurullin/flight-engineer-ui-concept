<template lang="pug">
  div
    h1 Состояние пользовательских планшетов
    table#lightsTable()
      tr
        td
          table#busClass
            tr(v-for="letter in busRows")
              td(v-for="num in busCols") 
                indicator(:text="letter+num", color="green", :id="'i' + letter + num", @select-indicator="selectNewIndicator", @indicatorChanged="indicatorChanged")
        td          
          table#ecoClass
            tr(v-for="letter in ecoRows")
              td(v-for="num in ecoCols") 
                indicator(:text="letter+num", color="green", :id="'i' + letter + num", @select-indicator="selectNewIndicator", @indicatorChanged="indicatorChanged")
    table#infoTable(v-if="selectedIndicator")
      tr
        td 
          | Состояние: 
          indicator(text="Всё хорошо", color="green", is-not-selectable="true", ref="generalStatus")
        td 
          | Подключение к интернету:
          indicator(text="Подключено", color="green", is-not-selectable="true")
        td 
          | Питание от сети: 
          indicator(text="Да", color="green", ref="powerIndicator", is-not-selectable="true")
      tr
        td 
          | Обновление баз данных: 
          indicator(text="Обновлены", color="green", is-not-selectable="true")
        td 
          | Прошивка: 
          indicator(text="Последняя", color="green", is-not-selectable="true")
        td 
          | Версия: 
          indicator(text="3.0", color="green", is-not-selectable="true")
      tr
        td 
          | Подключение тачпада
          indicator(text="Подключен", color="green", is-not-selectable="true")
</template>

<script>
  export default {
    data: function() {
      let busWidth = 5;
      let busHeight = 4;
      let busLetters = ['F', 'D', 'C', 'A'];

      let bw = [];
      for (let i = 1; i <= busWidth; i++) {
        bw.push(i);
      }

      let bh = [];
      for (let i = 0; i < busHeight; i++) {
        bh.push(busLetters[i]);
      }

      let ecoWidth = 20;
      let ecoHeight = 6;
      let ecoLetters = ['F', 'E', 'D', 'C', 'B', 'A'];

      let ew = [];
      for (let i = 1; i <= ecoWidth; i++) {
        ew.push(i+busWidth);
      }

      let eh = [];
      for (let i = 0; i < ecoHeight; i++) {
        eh.push(ecoLetters[i]);
      }

      return {
        busCols: bw,
        busRows: bh,
        ecoCols: ew,
        ecoRows: eh,
        selectedIndicator: null
      };
    },
    methods: {
      selectNewIndicator: function (el) {
        this.selectedIndicator = el;
        this.updateDetailsIndocators();
      },
      indicatorChanged: function () {
        this.updateDetailsIndocators();
      },
      updateDetailsIndocators: function() {
        this.$refs["powerIndicator"].txt = this.selectedIndicator.powerText;
        this.$refs["powerIndicator"].clr = this.selectedIndicator.clr;

        this.$refs["generalStatus"].txt = this.selectedIndicator.generalStatus;
        this.$refs["generalStatus"].clr = this.selectedIndicator.clr;
      }
    },
    components: {
      'indicator': require('./Indicator.vue').default
    },
    mounted() {
      this.selectedIndicator = $('#iD12')[0].__vue__;
      $('#iD12').addClass('selected');
      /*let yellowComp = $('#iD11')[0].__vue__;
      setInterval(() => yellowComp.clr = (yellowComp.clr == "green") ? "yellow": "green", 2000);*/
    }
  }
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
  #lightsTable {
    text-align: center;
  }
  #infoTable {
    width: 100%;
    font-size: 20px;
    margin-top: 3rem;
    padding-left: 1rem;

    td {
      width: 33%;
    }
  }
</style>