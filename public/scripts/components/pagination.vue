<style lang="scss">
.pagination {
  .pagers {
    list-style: none;
  }

  .pager {
    display: inline-block;
    padding: 0 0.5rem;

    span {
      display: inline-block;
      border-color: currentColor;
      border-width: 1px;
      border-style: solid;

      width: 28px;
      height: 28px;

      color: lightgray;
      line-height: 28px;
      text-align: center;
    }

    &.current {
      span {
        border-color: green;

        color: white;

        background-color: green;
      }
    }
  }
}
</style>

<template lang="jade">
.pagination
  ul.pagers
    li.pager(v-repeat="pager in pagers", v-class="{current: pager.current}", v-on="click: goTo(pager.page)")
      span(v-text="pager.page")
  .jumper(v-show="showJumper")
    form(v-on="submit: jump")
      input(type="text", v-model="jumper.page")
</template>

<script>
  module.exports = {
    props: {
      onChange: Function,
      total: {
        type: Number,
        required: true
      },
      pagerSize: {
        type: Number,
        default: 10
      }
    },
    data: function() {
      return {
        current: 0,
        total: 0,
        pagerSize: 5,
        pagers: [],
        jumper: {
          target: 0
        },
        showJumper: false
      }
    },
    methods: {
      goTo: function(page) {
        this.current = page - 1;

        this.update();
      },
      prevPage: function() {
        this.goTo(this.current + 1);
      },
      nextPage: function() {
        this.goTo(this.current - 1);
      },
      update: function() {
        if(this.total) {
          this.jumper.page = this.current + 1;
        }

        var calculateRange = function(current, total, size) {
          var range = {
            min: 0,
            max: 0
          };

          var halfSize = (size - 1) / 2;
          var smallPagers = current - 1;
          if(smallPagers < halfSize) {
            range.min = 1;
          } else {
            range.min = current - halfSize;
          }
          range.max = Math.min(total, (range.min + size - 1));

          var length = range.max - range.min + 1;
          if((length < size) && (range.min > 1)) {
            range.min = Math.max(1, range.min - (size - length));
          }

          return range;
        };

        this.pagers = [];
        var range = calculateRange(this.current, this.total, this.pagerSize);
        for(var i = range.min; i <= range.max; i++) {
          this.pagers.push({
            page: i,
            current: i == this.jumper.page
          });
        }
      }
    },
    created: function() {
      this.update();

      this.$watch('total', this.update.bind(this));

      this.$watch('pagerSize', this.update.bind(this));
    }
  };
</script>
