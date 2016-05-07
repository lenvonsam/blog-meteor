import { Template } from 'meteor/templating';
import { Person } from '../../helpers/person.js';

//arrows and lexical this
var bob = {
	_name:"Bob",
	_friends:["123","456"],
	printFriends() {
		var str = "";
		this._friends.forEach(f => str+= this._name+" knows "+f+"\n");
		return str;
	}
};

//classes oo pattern

let person = new Person('Sam');

var name = "Bob", time = "today";
var tempStr4 = `In ES5 this is
				not legal.`
var test = () => {
	alert('456');	
};

//destructuring
var [a,,b] = [1,2,3];

// Destructuring + defaults arguments
function r({x, y, w = 10, h = 10}) {
  return x + y + w + h;
}

function f1(x, y=12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}

//Default + Rest + Spread
function f2(x, ...y) {
  // y is an Array
  return x * y.length;
}

function f3(x, y, z) {
  return x + y + z;
}

//Let + Const
function f() {
  {
    let x;
    {
      // okay, block scoped name
      const x = "sneaky";
      // error, const
      // x = "foo";
    }
    // okay, declared with `let`
    x = "bar";
    // error, already declared in block
    // let x = "inner";
  }
}

//Iterators + For..Of
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
};


//Map + Set + WeakMap + WeakSet
var s = new Set();
s.add("hello").add("goodbye").add("hello");

// s.size === 2;
// s.has("hello") === true;

// Maps
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
// m.get(s) == 34;

//Tail Calls
function factorial(n, acc = 1) {
    "use strict";
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

//promise
function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

var p = timeout(1000).then(() => {
    return timeout(2000);
}).then(() => {
    throw new Error("hmm");
}).catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
})


Template.es6List.helpers({
	name:'sam',
	bob:bob,
	person:person,
	str1:`This is a pretty little template string.`,
	str2: `hello ${name}, how are you ${time}`,
	str3: String.raw`In Es5"\n" is a line-feed`,
	str4: tempStr4,
	promisP:console.log(p),
	ifA:()=>{
		return a===1 ? 'yes':'no';
	},
	ifB:function(){
		return a===2 ? 'yes':'no';
	},
	r:r({x:1,y:2}),
	fib:console.log(fibonacci),
	fibFunc:() => {
		for (var n of fibonacci) {
		  // truncate the sequence at 1000
		  if (n > 1000)
		    break;
		  console.log(n);
		}
	},
	factorial:factorial(3)
});

Template.arrowsAndLexical.events({
	'click button#arrowBtn1':()=>{
		var p = $('#arrowBtn1').next();
		p.text(bob.printFriends());
	},
	'click button#arrowBtn2':()=>{
		test();
	},
	'click button#arrowBtn3':()=> {
		alert(f1(3));
	},
	'click button#arrowBtn4':()=> {
		alert(f2(3,"hello",true));
	},
	'click button#arrowBtn5':() => {
		alert(f3(...[1,2,3]));
	}
});

Template.classesTemp.events({
	'click button':()=> {
		var p = $('#classesTempBtn').next();
		p.text(person.printName());
	}
});

Template.templateString.events({
	'click button#templateStringBtn1':()=> {
		var p = $('#templateStringBtn1').next();
		p.text(`hello ${name}, how are you ${time}`);
	},
	'click button#templateStringBtn2':()=> {
		var p = $('#templateStringBtn2').next();
		p.text(String.raw`In ES5 "\n" is a line-feed.`
);
	}

});

Template.destructingTemp.events({
	'click button#destructingBtn1':()=> {
		alert(a===1);
	},
	'click button#destructingBtn2':()=> {
		alert(a===2);	
	},
	'click button#destructingBtn3':()=> {
		alert(b===3);	
	}

});

Template.iteratorsTemp.events({
	'click button':() => {
		var p = $('#iteratorBtn').next();
		var str = "";
		for (var n of fibonacci) {
  		// truncate the sequence at 1000
  			if (n > 100)
    		break;
    		str+=n+"、";
		}
		p.text(str.substring(0,str.length-1));
	}
});

Template.mapandsetTemp.events({
	'click button#maptempBtn':()=> {
		var p = $('#maptempBtn').next();
		p.text(m.get(s));
	},
	'click button#settempBtn':()=> {
		var p = $('#settempBtn').next();
		var str = "s.size:"+ s.size;
		var str1 = "s.has('hello'):"+ s.has('hello');
		p.text(str+'|'+str1);
	}
});