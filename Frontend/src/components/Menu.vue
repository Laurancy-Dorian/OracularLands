<template>
  <nav class="navbar navbar-expand-xl">
    <div class="container h-100">
      <a class="navbar-brand" href="/">
        <h1 class="tm-site-title mb-0">Oracular &nbsp; Lands</h1>
      </a>
      <button class="navbar-toggler ml-auto mr-0" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fa fa-bars tm-nav-icon"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto h-100">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <i class="fas fa-dice"></i>
              Sessions
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-book"></i>
              Arcs Narratifs
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-users"></i>
              Utilisateurs
            </a>
          </li>
          <li class="nav-item dropdown">

            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-crown"></i>
              <span>
                                        Espace MJ <i class="fas fa-angle-down"></i>
                                    </span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#"><i class="fas fa-book"></i><span>Arcs Narratifs</span></a>
              <a class="dropdown-item" href="#"><i class="fas fa-dice"></i><span>Sessions</span></a>
              <a class="dropdown-item" href="#"><i class="fas fa-folder-open"></i><span>Documents</span></a>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/account">
              <i class="far fa-user"></i>
              <span>Profil</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
  export default {

  }
</script>


