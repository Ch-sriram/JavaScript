/*jshint esversion: 6*/
// CODING CHALLENGE - VIII
/*
Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets
It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.
At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (formula: number of trees/park area)
2. Average age of the parks in the town (formula: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
All the report data should be printed to the console.
HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/

class Structure {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
    getName() { return this.name; }
    getBuildAge() { return new Date().getFullYear() - this.buildYear; }
}

class Park extends Structure {
    constructor(name, buildYear, trees, area) {
        super(name, buildYear);
        this.trees = trees;
        this.area = area;
    }

    getTrees() { return this.trees; }
    getArea() { return this.area; }
}


class Street extends Structure {
    constructor(name, buildYear, length, size = "normal") {
        super(name, buildYear);
        
        if(length > 0) this.length = length;
        else this.length = 1;

        if (this.length > 0) {
            if (this.length < 10) this.size = "tiny";
            else if (this.length < 20) this.size = "small";
            else if(this.length < 30) this.size = "normal";
            else if(this.length < 50) this.size = "big";
            else this.size = "huge";
        }
    }

    getLength() { return this.length; }
    getSize() { return this.size; }
}


let parks = new Map();
parks.set(0, new Park("Indira", 1978, 3059, 76));
parks.set(1, new Park("Sanjeevaiah", 1984, 4500, 92));
parks.set(2, new Park("Lumbini", 1994, 750, 7.5));

// calculation of tree density of each park in the town
parks.set('calculateTreeDensity', () => {
    for (const [key, value] of parks.entries())
        if (typeof key === 'number')
            console.log(`\t${value.getName()} Park: ${(value.getTrees() / value.getArea()).toFixed(2)}`);
    console.log("\n");
});

// calculation of average age of the parks in the town
parks.set('calculateAverageAge', () => {
    let ageSum = 0;
    let numParks = 0;
    for (const [key, value] of parks.entries()) {
        if (typeof key === 'number') {
            ++numParks;
            ageSum += value.getBuildAge();
        }
    }
    return `Average Age of the Parks in the Town is ${(ageSum / numParks).toFixed(2)} Years.`;
});

// get the name of the park that has more than 1000 trees
parks.set('getParkNameOf1000Trees', () => {
    parks.forEach((value, key) => {
        if (typeof key === 'number')
            if (value.getTrees() >= 1000)
                console.log(`\t${value.getName()} Park`);
    });
    console.log("\n");
});


let streets = new Map();
streets.set(0, new Street("Gandhinagar", 1965, 40));
streets.set(1, new Street("Jawaharnagar", 1965, 5));
streets.set(2, new Street("Dhoolpet", 1978, 60));
streets.set(3, new Street("Fifth Avenue", 16));

// get the total length of the streets and the average length of the streets
streets.set('getStreetLengthAverage', () =>{
    let lengthSum = 0, numStreets = 0; 
    for(const [k, v] of streets.entries()) {
        if(typeof k === 'number') {
            lengthSum += v.getLength();
            ++numStreets;
        }
    }
    return `Total Length of all the Streets is ${lengthSum} km and Average Length of the Streets is ${(lengthSum / numStreets).toFixed(2)} km in the Town.`;
});

let capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

streets.set('getStreetClasification', () => {
    for(const [key, value] of streets.entries())
        if (typeof key === 'number') 
            console.log(`\t${value.getName()} Street: ${capitalize(value.getSize())}`);
            // console.log(`\t${value.getName()} Street: ${value.getSize().charAt(0).toUpperCase() + value.getSize().slice(1)}`);
});


// 1. Tree density of each park in the town (formula: number of trees/park area)
console.log("1. Tree Density (#trees per acre) of Each Park in the Town:");
parks.get('calculateTreeDensity')();

// 2. Average age of the parks in the town (formula: sum of all ages/number of parks)
console.log(`2. ${parks.get('calculateAverageAge')()}`);
console.log("\n");

// 3. The name of the park that has more than 1000 trees
console.log(`3. Parks that have 1000 Trees and more:`);
parks.get('getParkNameOf1000Trees')();

// 4. Total and average length of the town's streets
console.log(`4. ${streets.get('getStreetLengthAverage')()}`);
console.log("\n");

// 5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
console.log(`5. Size Classification of the Streets:`);
streets.get('getStreetClasification')();