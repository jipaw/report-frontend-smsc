<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p class="social">
<!--          <a :href="'https://github.com/' + repository">
            <span class="icon">
              <i class="fa fa-github"></i>
            </span>
          </a>-->
<!--          <a href="https://twitter.com/_fundon">
            <span class="icon">
              <i class="fa fa-twitter"></i>
            </span>
          </a>-->
        </p>
        <p>FSERV SMS GATEWAY REPORT<a href="#"></a></p>
        <p><span class="icon"><i class="fa fa-code"></i></span> All right reserved. Copyright <span class="icon"><i class="fa fa-copyright"></i></span> 2017 by <a href="#  ">FSERV</a>.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

  data () {
    return this.$store.state.pkg
  }

}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/mixins';

.footer {
  margin-left: 180px;

  @include mobile() {
    margin-left: 0;
  }

  .social a {
    border-bottom: none !important;
  }

  .fa.fa-heart {
    color: red;
  }
}
</style>
