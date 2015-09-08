<style lang="scss">
.pagination {
  .pagers {
    list-style: none;
  }

  .pager {
    display: inline-block;
    padding: 0 0.5rem;

    button {
      padding: 0;
      border: none;

      outline: none;

      cursor: pointer;

      background: white;
    }

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

  .jumper {
    input {
      display: inline-block;

      height: 28px;

      color: lightgray;
      line-height: 28px;
      text-align: center;
    }
  }
}
</style>

<template lang="jade">
.pagination
  ul.pagers
    li.pager
      button(v-on="click: prevPage")
        span &lt;
    li.pager(v-repeat="pager in pagers", v-class="{current: pager.current}")
      button(v-on="click: goTo(pager.page)")
        span(v-text="pager.page")
    li.pager
      button(v-on="click: nextPage")
        span &gt;
  .jumper(v-show="showJumper")
    form(v-on="submit: jumpTo($event, jumper.page)")
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
        default: 3
      },
      showJumper: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      return {
        current: 1,
        total: 0,
        pagerSize: 10,
        pagers: [],
        jumper: {
          page: 0
        },
        showJumper: false
      }
    },
    methods: {
      goTo: function(page) {
        page = Math.min(Math.max(page, 1), this.total);

        if(page == this.current) {
          return;
        }

        this.current = page;

        this.update();

        if(this.onChange) {
          this.onChange(this.current);
        }
      },
      prevPage: function() {
        this.goTo(this.current - 1);
      },
      nextPage: function() {
        this.goTo(this.current + 1);
      },
      jumpTo: function($event, page) {
        $event.preventDefault();

        var _page = parseInt(page);
        if(!isNaN(_page)) {
          this.goTo(_page);
        }
      },
      update: function() {
        this.jumper.page = this.current;

        var calculateRange = function(current, total, size) {
          var range = {
            min: 1,
            max: total
          };

          var halfSize = Math.floor((size - 1) / 2);
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
