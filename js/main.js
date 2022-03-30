
/*****************************************  tree binary ****************************************************************/
class ExistingValueError extends Error {
    constructor(message) {
        super(message);
        this.name = "ExistingValueError";
    }
}
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
/**
 * @class TreeNode
 * @constructor initialize the node with the value parameter and set null the right and left subNode(subTree)
 */
class TreeNode {
    constructor(value) {
        this.value = value;
        this.right = null;
        this.left = null;
        this.level = 0;
        this.height = 0;
        this.balancing = 0;
    }
}
/**
 * @class Tree
 * @constructor initialize the tree with an empty root
 */
class Tree {
    constructor() {
        this.root = getTree();
        this.level = 0;
        this.id = 0;
        this.assignIdForNode();
    }
    insert_value(value) {
        try {
            this.root = this._insert(this.root, value);
        } catch (ExistingValueError) {
            return false;
        }
        this._calculateLevelsAndHeightsAndBalancing(this.root);
        this.assignIdForNode();
        return true;
    }
    _insert(root, value) {
        if (root == null) {
            root = new TreeNode(value);
        } else if (root.value < value) {
            root.right = this._insert(root.right, value);
        } else if (root.value > value) {
            root.left = this._insert(root.left, value);
        } else {
            throw new ExistingValueError("the value already exist");
        }
        return root;
    }
    cancel_value(value) {
        try {
            this.root = this.cancel(this.root, value);
        } catch (NotFoundError) {
            return false;
        }
        this._calculateLevelsAndHeightsAndBalancing(this.root);
        this.assignIdForNode();
        return true;
    }
    cancel(root, value) {
        if (root == null) {
            throw NotFoundError("value not found");
        } else if (root.value < value) {
            root.right = this.cancel(root.right, value);
        } else if (root.value > value) {
            root.left = this.cancel(root.left, value);
        } else {
            // case 1 if there is no subtree
            if (root.right == null && root.left == null)
                return null;
            // case 2 if there is two subtree
            else if (root.right != null && root.left != null) {
                console.log(root.value);
                root.value = Tree.max(root.left);
                root.left = this.cancel(root.left, root.value);
            }
            // case 3 if there is one subtree
            else
                return root.right ? root.right : root.left;
        }
        return root;
    }
    search(value) {
        let temp = this.root;
        while (temp)
            if (temp.value < value)
                temp = temp.right;
            else if (temp.value > value)
                temp = temp.left;
            else
                return temp;
        return false;
    }
    get min() {
        let temp = this.root;
        if (!temp)
            throw "empty tree";
        while (temp.left)
            temp = temp.left;
        return temp.value;
    }
    get max() {
        let temp = this.root;
        if (!temp)
            throw "empty tree";
        while (temp.right)
            temp = temp.right;
        return temp.value;
    }
    static min(root) {
        let temp = root;
        if (!temp)
            throw "empty tree";
        while (temp.left)
            temp = temp.left;
        return temp.value;
    }
    static max(root) {
        let temp = root
        if (!temp)
            throw "empty tree";
        while (temp.right)
            temp = temp.right;
        return temp.value;
    }
    assignIdForNode(){
        this.id = 0;
        this._assignIdForNode(this.root);
    }
    _assignIdForNode(root){
        if(root == null) return;
        root.id = this.id++;
        this._assignIdForNode(root.left);
        this._assignIdForNode(root.right);
    }
    _calculateLevelsAndHeightsAndBalancing(root) {
        if (root === null)
            return 0;
        root.level = this.level++;
        let left = (root.left ? 1 : 0) + this._calculateLevelsAndHeightsAndBalancing(root.left);
        let right = (root.right ? 1 : 0) + this._calculateLevelsAndHeightsAndBalancing(root.right);
        this.level--;
        root.balancing = left - right;
        root.height = right > left ? right : left;
        return root.height;
    }
}
function saveTree(root) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function ()  {
        if (this.readyState === 4 && this.status === 200) {
            console.log((this.responseText))
        }
    };
    http.open("POST", "./php/mangeTree.php", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("tree=" + JSON.stringify(tree));
}
function getTree() {
    let http = new XMLHttpRequest(),
        data;
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            data = JSON.parse(this.responseText)
        }
    };
    http.open("GET", "./php/mangeTree.php?getTree", false);
    http.send();
    return data.root;
}
tree = new Tree();

let defaultOptions = {
    direction: "UD",
    nodesShadow: true,
    edgesShadow: true,
    clickToUse: false,
    borderColor: "#2B7CE9",
    backgroundColor: "#D2E5FF",
    borderColorHighlight: "#2B7CE9",
    backgroundColorHighlight: "#D2E5FF"
};
// get all input options element
/**
 * @description element that contain all input options
 * @type {HTMLElement}
 */
let userOptions = document.getElementById("options");
/**
 * @description element that contain the tree view direction
 * @type {Element}
 */
let directionSelection = document.getElementById("direction-selection");
if ( !directionSelection || !directionSelection.getElementsByTagName('option').length)   
    directionSelection = {value: defaultOptions.direction};



/**
 * @description element that contain the tree node border size
 * @type {Element}
 */
let nodesShadow = document.getElementById("nodes-shadow");
if (nodesShadow)
    nodesShadow.checked = defaultOptions.nodesShadow;
else
    nodesShadow = {checked: defaultOptions.nodesShadow};
/**
 * @description element that contain the tree node border size
 * @type {Element}
 */
let edgesShadow = document.getElementById("edges-shadow");
if (edgesShadow)
    edgesShadow.checked = defaultOptions.edgesShadow;
else
    edgesShadow = {checked: defaultOptions.edgesShadow};
/**
 * @description element that contain the tree view click to use option
 * @type {Element}
 */
let clickToUse = document.getElementById("click-to-use");
if (clickToUse)
    clickToUse.checked = defaultOptions.clickToUse;
else
    clickToUse = {checked: defaultOptions.clickToUse};
/**
 * @description element that contain the tree view click to use option
 * @type {Element}
 */
let borderColor = document.getElementById("border-color");
if (borderColor)
    borderColor.value = defaultOptions.borderColor;
else
    borderColor.value = {value: defaultOptions.borderColor};
/**
 * @description element that contain the tree view click to use option
 * @type {Element}
 */
let backgroundColor = document.getElementById("background-color");
if (backgroundColor)
    backgroundColor.value = defaultOptions.backgroundColor;
else
    backgroundColor.value = {value: defaultOptions.backgroundColor};
/**
 * @description element that contain the tree view click to use option
 * @type {Element}
 */
let borderColorHighlight = document.getElementById("border-color-highlight");
if (borderColorHighlight)
    borderColorHighlight.value = defaultOptions.borderColorHighlight;
else
    borderColorHighlight.value = {value: defaultOptions.borderColorHighlight};
/**
 * @description element that contain the tree view click to use option
 * @type {Element}
 */
let backgroundColorHighlight = document.getElementById("background-color-highlight");
if (backgroundColorHighlight)
    backgroundColorHighlight.value = defaultOptions.backgroundColorHighlight;
else
    backgroundColorHighlight.value = {value: defaultOptions.backgroundColorHighlight};
/**
 * @description element that contain redraw the tree with the current options
 * @type {Element}
 */
let applyButton = document.getElementById("apply-button");
/**
 * @description element that contain redraw the tree with the default options
 * @type {Element}
 */
let resetButton = document.getElementById("reset-button");
let nodes = null;
let edges = null;
let network = null;
let container = document.getElementById("mynetwork");
function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}
function draw() {
    destroy();
    nodes = [];
    edges = [];
    let connectionCount = [];
    // randomly create some nodes and edges
    (function getValue(root){
        if (root == null) return;
        nodes.push({ id: root.id, label: String(root.value), level:root.level, height: root.height, balancing: root.balancing});
        if (root.left != null) {
            edges.push({ from: root.id, to: root.left.id});
        }
        if (root.right != null) {
            edges.push({ from: root.id, to: root.right.id});
        }
        getValue(root.left);
        getValue(root.right)
    }(tree.root));
    // create a network
    let data = {
        nodes: nodes,
        edges: edges
    };
    let options = {
        nodes:{
            color: {
                border: borderColor.value,
                background: backgroundColor.value,
                highlight: {
                    border: borderColorHighlight.value,
                    background: backgroundColorHighlight.value
                }
            },
            font: {
                size : 30
            },
            chosen : true,
            shadow: nodesShadow.checked
        },
        autoResize: true,
        locale: 'it',
        clickToUse: clickToUse.checked,
        edges: {
            arrows: {
                to: true
            },
            smooth: {
                type: "cubicBezier",
                forceDirection:
                    directionSelection.value === "UD" || directionSelection.value === "DU"
                        ? "vertical"
                        : "horizontal",
                roundness: 0.4
            },
            shadow: edgesShadow.checked
        },
        interaction: {
            "hover": true
        },
        layout: {
            hierarchical: {
                direction: directionSelection.value
            }
        },
        physics: false
    };

    network = new vis.Network(container, data, options);

    // add event listeners
    network.on("select", function(params) {
        let node = nodes[params.nodes];
        Swal.fire({
            title: `Value = ${node.label} <br /> Level = ${node.level} <br /> Balancing = ${node.balancing} <br /> Height = ${node.height}`,
            showClass: {
                popup: 'animated fadeInDown faster'
            },
            hideClass: {
                popup: 'animated fadeOutUp faster'
            }
    })
        // document.getElementById("selection").innerHTML =
        //     "<b>Node selected </b>: <br />Value = <b>" + node.label + "</b><br /> Level = <b>" + node.level + "</b><br /> Balancing = <b>" + node.balancing + "</b> <br /> Height = <b>" + node.height + "</b> <br />";
    });
}
applyButton.onclick = function () {
    draw();
};
resetButton.onclick = function () {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You wont reset all!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, reset it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
        swalWithBootstrapButtons.fire(
            'reset!',
            'Your settings have been reset.',
            'success'
        )
        directionSelection.value = defaultOptions.direction;
        nodesShadow.checked = defaultOptions.nodesShadow;
        edgesShadow.checked = defaultOptions.edgesShadow;
        clickToUse.checked = defaultOptions.clickToUse;
        borderColor.value = defaultOptions.borderColor;
        backgroundColor.value = defaultOptions.backgroundColor;
        borderColorHighlight.value = defaultOptions.borderColorHighlight;
        backgroundColorHighlight.value = defaultOptions.backgroundColorHighlight;
        draw();
        } else if ( result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary settings are safe :)',
            'error'
        )
        }
    })
};
window.addEventListener("load", () => {
    draw();
});
let newNodeValue = document.getElementsByClassName("new-node-value")[0];
let newNodeButton = document.getElementById("new-node");
newNodeButton.onclick = function () {
    if(newNodeValue.value == "")
        Swal.fire(
            " ",
            `You must enter a number, try again`,
            "error"
            ) 
    else
        if (!tree.insert_value(Number(newNodeValue.value)))
            Swal.fire(
                " ",
                `Element ${searchNodeValue.value} already exist, try again`,
                "error"
                )  
        else
            Swal.fire(
                " ",
                'Element is added successfully!',
                'success'
            )
            draw();
            // saveTree(tree.root);
};
let deleteNodeValue = document.getElementsByClassName("delete-node-value")[0];
let deleteNodeButton = document.getElementById("delete-node");
deleteNodeButton.onclick = function () {
    if(deleteNodeValue.value == "")
        Swal.fire(
            " ",
            `You must enter a number, try again`,
            "error"
            ) 
else
    if (!tree.cancel_value(Number(deleteNodeValue.value)))
    Swal.fire(
        " ",
        `Element ${deleteNodeValue.value} not found , try again`,
        "error"
        )  
    else
        Swal.fire(
            " ",
            'Element is deleted successfully!',
            'success'
        )
        draw();
        // saveTree(tree.root);
};
let searchNodeValue = document.getElementsByClassName("search-node-value")[0];
let searchNodeButton = document.getElementById("search-node");
searchNodeButton.onclick = function () {
let res = tree.search(Number(searchNodeValue.value));
if(searchNodeValue.value == "")
    Swal.fire(
        " ",
        `You must enter a number, try again`,
        "error"
        ) 
else
    if (res == false  || searchNodeValue.value == "")
        Swal.fire(
            " ",
            `Element ${searchNodeValue.value} not found , try again`,
            "error"
            )  
    else
    Swal.fire(
        `Element is found : <br /> Value = ${res.value} <br /> Level = ${res.level} <br /> Balancing = ${res.balancing}`
        )
};


let showSettings = () => {
    let setting = document.getElementsByClassName("settings")[0];
    setting.onclick = () => {
        $("#options").toggle(250);
    }
}
showSettings();

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });