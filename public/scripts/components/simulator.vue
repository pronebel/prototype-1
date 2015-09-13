<style lang="scss">
.simulator {
  display: block;
  margin: 0 auto;
  padding: 19px;
  border: none;

  box-shadow: 0 0 0.1rem black;
  border-radius: 10px;

  background-color: #bbbbbb;

  &.iphone-4 {
    width: 358px;
  }

  .screen {
    margin: 0;
    padding: 0;
    height: 480px;

    background-color: white;
  }
}
</style>

<template lang="jade">
.simulator(
  v-class="device"
  v-on="click: selectComponent($event), drop: dropComponent($event), dragover: dragOverComponent($event), dragenter: dragEnterComponent($event), dragleave: dragLeaveComponent($event)"
)
  .screen
</template>

<script>
  var componentFactory = require('../services/factory');

  module.exports = {
    props: {
      device: {
        type: String,
        default: 'iphone-5s'
      }
    },
    data: function() {
    },
    methods: {
      paginationChange: function(pagination) {
      },
      selectComponent: function(evt) {
      },
      dragComponent: function(widget, evt) {
      },
      dragOverComponent: function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
      },
      dragEnterComponent: function(evt) {
        evt.target.classList.add('drag-enter');
      },
      dragLeaveComponent: function(evt) {
        evt.target.classList.remove('drag-enter');
      },
      dropComponent: function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        evt.target.classList.remove('drag-enter');

        componentFactory.create(evt.dataTransfer.getData('Text'), evt.target);
      }
    }
  };
</script>
