<!DOCTYPE html>
<html lang="it">
<head>
    <title>Binary Tree</title>
    <meta charset="UTF-8">
    <link rel="icon" href="../page3/images/logo.red.pieno.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
<!--    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">-->
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
    <!-- Bootstrap core CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.15.0/css/mdb.min.css" rel="stylesheet">
    <!-- my file css -->
    <link rel="stylesheet"  href="css/main.css">
</head>
<body>
<div class="container-fluid">
    <i class="fas fa-cogs fa-2x fixed-left settings"></i>
    <div id="view-setting text-capitalize">
        <div id="options" class="options bg-dark text-white rounded-lg ">
            <div class="input-field col s12 mt-0">
                <select id="direction-selection">
                    <option value="UD" disabled selected> Direction </option>
                    <option value="UD">up down</option>
                    <option value="DU">down up</option>
                    <option value="LR">left right</option>
                    <option value="RL">right left</option>
                </select>
            </div>
            <div class= "row mt-3 mx-auto pl-3">
                <!-- Node Switch -->
                <div class="switch  col-12 mx-auto col-md-6 float-left mt-2">
                    <label>
                    <input type="checkbox" id="nodes-shadow" checked>
                    <span class="lever"></span>
                    Nodes Shadow
                    </label>
                </div>

                <!-- Edges Switch -->
                <div class="switch col-12 mx-auto col-md-6 float-right mt-2">
                    <label>
                    <input type="checkbox" id="edges-shadow" checked>
                    <span class="lever"></span>
                    Edges Shadow
                    </label>
                </div>

            </div>
            <div id="view-color-settings" class="row mt-3 mb-3">
                <div class = "col-md-6 col-10 mx-auto mt-2">
                    <label for="border-color">border-color</label>
                    <input type="color" class="form-control form-control-sm" id="border-color" value="#2B7CE9">
                </div>
                <div class = "col-md-6 col-10 mx-auto mt-2">
                    <label for="background-color">background-color</label>
                    <input type="color" class="form-control form-control-sm" id="background-color" value="#D2E5FF">
                </div>
                <div class = "col-md-6 col-10 mx-auto mt-2">
                    <label for="border-color-highlight">border-color-highlight</label>
                    <input type="color" class="form-control form-control-sm" id="border-color-highlight" value="#2B7CE9">
                </div>
                <div class = "col-md-6 col-10 mx-auto mt-2">
                    <label for="background-color-highlight">background-color-highlight</label>
                    <input type="color" class="form-control form-control-sm" id="background-color-highlight" value="#D2E5FF">
                </div>
            </div>
            <button class="float-right btn btn-primary btn-rounded d-inline pl-5 pt-2 pb-2 pr-5 float-md-left" type="button" name="apply" id="apply-button" value="Apply">Apply</button>
            <button class="float-left btn btn-danger btn-rounded d-inline pl-5 pt-2 pb-2 pr-5 float-md-right" type="button" name="reset" id="reset-button" value="Reset">Reset</button>
        </div>
    </div>

    <div class="row mt-5">
        <div class="col-sm-10 col-md-2 mx-auto">
            <!-- add input -->
            <div class="md-form form-sm">
                <input type="number" id="new-node-input" class="form-control form-control-sm  new-node-value" value = "">
                <label for="new-node-input">Add new node</label>
                <button id="new-node" class="btn btn-primary form-btn">Add</button>
            </div>

            <!-- Delete input -->
            <div class="md-form form-sm">
                <input type="number" id="delete-node-input" class="form-control form-control-sm  delete-node-value" value = "">
                <label for="delete-node-input">Delete node</label>
                <button id="delete-node" class="btn btn-primary form-btn">Delete</button>
            </div>


            <!-- Search input -->
            <div class="md-form form-sm">
                <input type="number" id="search-node-input" class="form-control form-control-sm  search-node-value" value = "">
                <label for="search-node-input">Search node</label>
                <button id="search-node" class="btn btn-primary form-btn">Search</button>
            </div>
            <p id="selection"></p>

        </div>

        <div id="mynetwork" class="col-md-10 col-sm-12 mx-auto"></div>
    </div>
</div>
<!-- JQuery -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<!-- Materialize -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<!-- Bootstrap tooltips -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"></script>
<!-- MDB core JavaScript -->
<!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.20.0/js/mdb.min.js"></script>-->
<!-- alerts -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9.10.0/dist/sweetalert2.all.min.js"></script>
<!-- for tree -->
<script src="https://visjs.github.io/vis-network/standalone/umd/vis-network.min.js"></script>
<!-- <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/viz.js/2.1.2/viz.js"></script>
<!-- my script -->
<script src="js/main.js" ></script>

</body>
</html>
