const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("./models/Question");

dotenv.config();

const questions = [
  // =========================
  // QUANTITATIVE - 50
  // =========================

  {
    category: "quantitative",
    question: "What is 20% of 500?",
    options: ["50", "100", "150", "200"],
    correctAnswer: "100",
  },
  {
    category: "quantitative",
    question: "What is 25% of 400?",
    options: ["50", "75", "100", "125"],
    correctAnswer: "100",
  },
  {
    category: "quantitative",
    question: "What is 15% of 200?",
    options: ["20", "25", "30", "35"],
    correctAnswer: "30",
  },
  {
    category: "quantitative",
    question: "If a train travels 120 km in 2 hours, what is its speed?",
    options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
    correctAnswer: "60 km/h",
  },
  {
    category: "quantitative",
    question: "What is the average of 10, 20, 30, 40 and 50?",
    options: ["20", "25", "30", "35"],
    correctAnswer: "30",
  },
  {
    category: "quantitative",
    question: "A product costs ₹500. After a 10% discount, what is the selling price?",
    options: ["₹400", "₹450", "₹475", "₹490"],
    correctAnswer: "₹450",
  },
  {
    category: "quantitative",
    question: "What is 12 × 8?",
    options: ["86", "96", "88", "108"],
    correctAnswer: "96",
  },
  {
    category: "quantitative",
    question: "What is the square of 15?",
    options: ["215", "225", "235", "245"],
    correctAnswer: "225",
  },
  {
    category: "quantitative",
    question: "What is the cube of 4?",
    options: ["16", "32", "64", "128"],
    correctAnswer: "64",
  },
  {
    category: "quantitative",
    question: "If 5 workers complete a job in 10 days, how many worker-days are required?",
    options: ["15", "50", "100", "5"],
    correctAnswer: "50",
  },
  {
    category: "quantitative",
    question: "What is the simple interest on ₹1000 at 10% per year for 2 years?",
    options: ["₹100", "₹150", "₹200", "₹250"],
    correctAnswer: "₹200",
  },
  {
    category: "quantitative",
    question: "A number increased by 20% becomes 120. What was the original number?",
    options: ["90", "100", "110", "115"],
    correctAnswer: "100",
  },
  {
    category: "quantitative",
    question: "What is the ratio of 20 to 5?",
    options: ["2:1", "3:1", "4:1", "5:1"],
    correctAnswer: "4:1",
  },
  {
    category: "quantitative",
    question: "If x + 7 = 15, what is x?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
  },
  {
    category: "quantitative",
    question: "What is 144 ÷ 12?",
    options: ["10", "11", "12", "13"],
    correctAnswer: "12",
  },
  {
    category: "quantitative",
    question: "What is 3/4 of 200?",
    options: ["100", "125", "150", "175"],
    correctAnswer: "150",
  },
  {
    category: "quantitative",
    question: "A shopkeeper buys an item for ₹800 and sells it for ₹1000. What is the profit percentage?",
    options: ["20%", "25%", "30%", "15%"],
    correctAnswer: "25%",
  },
  {
    category: "quantitative",
    question: "What is the perimeter of a square with side 6 cm?",
    options: ["12 cm", "18 cm", "24 cm", "36 cm"],
    correctAnswer: "24 cm",
  },
  {
    category: "quantitative",
    question: "What is the area of a rectangle with length 10 cm and width 5 cm?",
    options: ["15 cm²", "30 cm²", "50 cm²", "100 cm²"],
    correctAnswer: "50 cm²",
  },
  {
    category: "quantitative",
    question: "If 2x = 18, what is x?",
    options: ["6", "8", "9", "10"],
    correctAnswer: "9",
  },
  {
    category: "quantitative",
    question: "What is 30% of 90?",
    options: ["18", "27", "30", "36"],
    correctAnswer: "27",
  },
  {
    category: "quantitative",
    question: "A car travels 180 km in 3 hours. What is its speed?",
    options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
    correctAnswer: "60 km/h",
  },
  {
    category: "quantitative",
    question: "What is the average of 5, 10 and 15?",
    options: ["8", "10", "12", "15"],
    correctAnswer: "10",
  },
  {
    category: "quantitative",
    question: "What is 7²?",
    options: ["14", "21", "42", "49"],
    correctAnswer: "49",
  },
  {
    category: "quantitative",
    question: "If a shirt costs ₹1000 and has a 20% discount, what is the discounted price?",
    options: ["₹700", "₹750", "₹800", "₹900"],
    correctAnswer: "₹800",
  },
  {
    category: "quantitative",
    question: "What is the LCM of 4 and 6?",
    options: ["8", "10", "12", "24"],
    correctAnswer: "12",
  },
  {
    category: "quantitative",
    question: "What is the HCF of 12 and 18?",
    options: ["3", "4", "6", "9"],
    correctAnswer: "6",
  },
  {
    category: "quantitative",
    question: "If 10 pencils cost ₹50, what is the cost of one pencil?",
    options: ["₹2", "₹5", "₹10", "₹15"],
    correctAnswer: "₹5",
  },
  {
    category: "quantitative",
    question: "What is 2³?",
    options: ["6", "8", "9", "12"],
    correctAnswer: "8",
  },
  {
    category: "quantitative",
    question: "Find the next number: 5, 10, 15, 20, ?",
    options: ["22", "24", "25", "30"],
    correctAnswer: "25",
  },
  {
    category: "quantitative",
    question: "A number divided by 5 gives 8. What is the number?",
    options: ["35", "40", "45", "50"],
    correctAnswer: "40",
  },
  {
    category: "quantitative",
    question: "What is 18% of 100?",
    options: ["8", "12", "18", "20"],
    correctAnswer: "18",
  },
  {
    category: "quantitative",
    question: "If 4 books cost ₹200, what is the cost of 7 books at the same rate?",
    options: ["₹250", "₹300", "₹350", "₹400"],
    correctAnswer: "₹350",
  },
  {
    category: "quantitative",
    question: "What is the sum of the first five natural numbers?",
    options: ["10", "15", "20", "25"],
    correctAnswer: "15",
  },
  {
    category: "quantitative",
    question: "What is the value of 9 × 9?",
    options: ["72", "81", "90", "99"],
    correctAnswer: "81",
  },
  {
    category: "quantitative",
    question: "If a person earns ₹500 per day for 6 days, how much does the person earn?",
    options: ["₹2500", "₹3000", "₹3500", "₹4000"],
    correctAnswer: "₹3000",
  },
  {
    category: "quantitative",
    question: "What is 1/5 of 100?",
    options: ["10", "20", "25", "50"],
    correctAnswer: "20",
  },
  {
    category: "quantitative",
    question: "A sum of ₹2000 is divided equally among 4 people. How much does each get?",
    options: ["₹400", "₹500", "₹600", "₹800"],
    correctAnswer: "₹500",
  },
  {
    category: "quantitative",
    question: "What is the square root of 81?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "9",
  },
  {
    category: "quantitative",
    question: "What is 45 + 55?",
    options: ["90", "95", "100", "105"],
    correctAnswer: "100",
  },
  {
    category: "quantitative",
    question: "A student scored 80 out of 100. What is the percentage?",
    options: ["70%", "75%", "80%", "85%"],
    correctAnswer: "80%",
  },
  {
    category: "quantitative",
    question: "What is the sum of angles in a triangle?",
    options: ["90°", "180°", "270°", "360°"],
    correctAnswer: "180°",
  },
  {
    category: "quantitative",
    question: "What is 1000 minus 375?",
    options: ["525", "625", "675", "725"],
    correctAnswer: "625",
  },
  {
    category: "quantitative",
    question: "If 3x + 5 = 20, what is x?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5",
  },
  {
    category: "quantitative",
    question: "What is 60% of 300?",
    options: ["120", "150", "180", "200"],
    correctAnswer: "180",
  },
  {
    category: "quantitative",
    question: "What is the average of 12 and 18?",
    options: ["14", "15", "16", "17"],
    correctAnswer: "15",
  },
  {
    category: "quantitative",
    question: "If the radius of a circle is 7 cm, what is its diameter?",
    options: ["7 cm", "10 cm", "14 cm", "21 cm"],
    correctAnswer: "14 cm",
  },
  {
    category: "quantitative",
    question: "What is 13 × 4?",
    options: ["42", "48", "52", "56"],
    correctAnswer: "52",
  },
  {
    category: "quantitative",
    question: "If a number is decreased by 10% from 200, what is the result?",
    options: ["170", "180", "190", "200"],
    correctAnswer: "180",
  },
  {
    category: "quantitative",
    question: "What is the remainder when 17 is divided by 5?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },

  // =========================
  // LOGICAL REASONING - 50
  // =========================

  {
    category: "logical",
    question: "Find the next number: 2, 4, 8, 16, ?",
    options: ["24", "30", "32", "36"],
    correctAnswer: "32",
  },
  {
    category: "logical",
    question: "Find the next number: 3, 6, 12, 24, ?",
    options: ["36", "42", "48", "50"],
    correctAnswer: "48",
  },
  {
    category: "logical",
    question: "Find the odd one out.",
    options: ["Apple", "Mango", "Carrot", "Banana"],
    correctAnswer: "Carrot",
  },
  {
    category: "logical",
    question: "A is taller than B. B is taller than C. Who is shortest?",
    options: ["A", "B", "C", "Cannot determine"],
    correctAnswer: "C",
  },
  {
    category: "logical",
    question: "If CAT is coded as DBU, how is DOG coded?",
    options: ["EPH", "EOH", "DPH", "FQI"],
    correctAnswer: "EPH",
  },
  {
    category: "logical",
    question: "Find the next letter: A, C, E, G, ?",
    options: ["H", "I", "J", "K"],
    correctAnswer: "I",
  },
  {
    category: "logical",
    question: "Which one is different?",
    options: ["Square", "Triangle", "Circle", "Rectangle"],
    correctAnswer: "Circle",
  },
  {
    category: "logical",
    question: "Find the next number: 1, 4, 9, 16, ?",
    options: ["20", "25", "30", "36"],
    correctAnswer: "25",
  },
  {
    category: "logical",
    question: "If all roses are flowers and some flowers fade quickly, which statement is definitely true?",
    options: [
      "All flowers are roses",
      "All roses are flowers",
      "Some roses fade quickly",
      "No flowers are roses"
    ],
    correctAnswer: "All roses are flowers",
  },
  {
    category: "logical",
    question: "Find the missing number: 10, 20, 40, 80, ?",
    options: ["120", "140", "160", "180"],
    correctAnswer: "160",
  },
  {
    category: "logical",
    question: "If TODAY is Monday, what day will it be after 3 days?",
    options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    correctAnswer: "Thursday",
  },
  {
    category: "logical",
    question: "Find the odd number: 2, 4, 6, 9, 10",
    options: ["2", "4", "6", "9"],
    correctAnswer: "9",
  },
  {
    category: "logical",
    question: "Find the next letter: Z, X, V, T, ?",
    options: ["R", "S", "Q", "P"],
    correctAnswer: "R",
  },
  {
    category: "logical",
    question: "If BOOK is coded as CPPL, what is the code for PEN?",
    options: ["QFO", "QEN", "PFN", "RFO"],
    correctAnswer: "QFO",
  },
  {
    category: "logical",
    question: "Which number does not belong? 4, 9, 16, 20, 25",
    options: ["4", "9", "20", "25"],
    correctAnswer: "20",
  },
  {
    category: "logical",
    question: "Find the next number: 1, 1, 2, 3, 5, ?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
  },
  {
    category: "logical",
    question: "A is the brother of B. B is the sister of C. What is A to C?",
    options: ["Brother", "Sister", "Father", "Uncle"],
    correctAnswer: "Brother",
  },
  {
    category: "logical",
    question: "Find the next number: 100, 90, 80, 70, ?",
    options: ["50", "55", "60", "65"],
    correctAnswer: "60",
  },
  {
    category: "logical",
    question: "Which word comes first alphabetically?",
    options: ["Apple", "Banana", "Mango", "Orange"],
    correctAnswer: "Apple",
  },
  {
    category: "logical",
    question: "If SOUTH is written as HTUOS, how is NORTH written?",
    options: ["HTRON", "NORTH", "NROTH", "HRTON"],
    correctAnswer: "HTRON",
  },
  {
    category: "logical",
    question: "Find the missing number: 2, 6, 12, 20, ?",
    options: ["24", "28", "30", "32"],
    correctAnswer: "30",
  },
  {
    category: "logical",
    question: "If yesterday was Friday, what day is tomorrow?",
    options: ["Saturday", "Sunday", "Monday", "Thursday"],
    correctAnswer: "Sunday",
  },
  {
    category: "logical",
    question: "Which is the odd one out?",
    options: ["Dog", "Cat", "Cow", "Eagle"],
    correctAnswer: "Eagle",
  },
  {
    category: "logical",
    question: "Find the next number: 5, 10, 20, 40, ?",
    options: ["60", "70", "80", "90"],
    correctAnswer: "80",
  },
  {
    category: "logical",
    question: "If 2 = 6, 3 = 12, then 4 = ?",
    options: ["16", "18", "20", "24"],
    correctAnswer: "20",
  },
  {
    category: "logical",
    question: "Which shape has three sides?",
    options: ["Square", "Triangle", "Circle", "Rectangle"],
    correctAnswer: "Triangle",
  },
  {
    category: "logical",
    question: "Find the next letter: B, D, F, H, ?",
    options: ["I", "J", "K", "L"],
    correctAnswer: "J",
  },
  {
    category: "logical",
    question: "If a clock shows 3:00, what is the angle between the hands?",
    options: ["0°", "45°", "90°", "180°"],
    correctAnswer: "90°",
  },
  {
    category: "logical",
    question: "Find the next number: 11, 22, 33, 44, ?",
    options: ["50", "55", "60", "66"],
    correctAnswer: "55",
  },
  {
    category: "logical",
    question: "Which number is the odd one out: 8, 27, 64, 100?",
    options: ["8", "27", "64", "100"],
    correctAnswer: "100",
  },
  {
    category: "logical",
    question: "If RED is coded as 18-5-4, what is BLUE coded using alphabet positions?",
    options: ["2-12-21-5", "1-12-20-5", "2-11-21-5", "3-12-21-5"],
    correctAnswer: "2-12-21-5",
  },
  {
    category: "logical",
    question: "Find the next number: 7, 14, 21, 28, ?",
    options: ["32", "35", "36", "42"],
    correctAnswer: "35",
  },
  {
    category: "logical",
    question: "A person walks north and then turns right. Which direction is the person facing?",
    options: ["North", "South", "East", "West"],
    correctAnswer: "East",
  },
  {
    category: "logical",
    question: "Which one is different?",
    options: ["January", "March", "May", "June"],
    correctAnswer: "June",
  },
  {
    category: "logical",
    question: "Find the next number: 2, 5, 10, 17, ?",
    options: ["24", "25", "26", "27"],
    correctAnswer: "26",
  },
  {
    category: "logical",
    question: "If A = 1, B = 2, C = 3, what is the value of CAB?",
    options: ["6", "5", "4", "7"],
    correctAnswer: "6",
  },
  {
    category: "logical",
    question: "If all cats are animals and some animals are pets, which is definitely true?",
    options: [
      "All animals are cats",
      "All cats are animals",
      "All pets are cats",
      "No cats are animals"
    ],
    correctAnswer: "All cats are animals",
  },
  {
    category: "logical",
    question: "Find the next number: 81, 27, 9, 3, ?",
    options: ["0", "1", "2", "6"],
    correctAnswer: "1",
  },
  {
    category: "logical",
    question: "Which word is different?",
    options: ["Pen", "Pencil", "Eraser", "Chair"],
    correctAnswer: "Chair",
  },
  {
    category: "logical",
    question: "If Monday is the 1st day, what is the 5th day?",
    options: ["Thursday", "Friday", "Saturday", "Sunday"],
    correctAnswer: "Friday",
  },
  {
    category: "logical",
    question: "Find the next number: 1, 8, 27, 64, ?",
    options: ["81", "100", "125", "216"],
    correctAnswer: "125",
  },
  {
    category: "logical",
    question: "A mother is older than her daughter. Who is younger?",
    options: ["Mother", "Daughter", "Both same", "Cannot determine"],
    correctAnswer: "Daughter",
  },
  {
    category: "logical",
    question: "Find the next letter: M, N, O, P, ?",
    options: ["Q", "R", "S", "T"],
    correctAnswer: "Q",
  },
  {
    category: "logical",
    question: "Which number is divisible by 3?",
    options: ["14", "16", "18", "20"],
    correctAnswer: "18",
  },
  {
    category: "logical",
    question: "Find the next number: 50, 45, 40, 35, ?",
    options: ["25", "30", "32", "40"],
    correctAnswer: "30",
  },
  {
    category: "logical",
    question: "If A is east of B, where is B relative to A?",
    options: ["East", "West", "North", "South"],
    correctAnswer: "West",
  },
  {
    category: "logical",
    question: "Which is the odd one out?",
    options: ["Red", "Blue", "Green", "Table"],
    correctAnswer: "Table",
  },
  {
    category: "logical",
    question: "Find the missing number: 1, 3, 6, 10, ?",
    options: ["12", "14", "15", "16"],
    correctAnswer: "15",
  },
  {
    category: "logical",
    question: "A person faces east and turns left. Which direction is the person facing?",
    options: ["North", "South", "East", "West"],
    correctAnswer: "North",
  },
  {
    category: "logical",
    question: "Find the next number: 9, 18, 36, 72, ?",
    options: ["108", "124", "144", "150"],
    correctAnswer: "144",
  },

  // =========================
  // VERBAL ABILITY - 50
  // =========================

  {
    category: "verbal",
    question: "Choose the synonym of Happy.",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    correctAnswer: "Joyful",
  },
  {
    category: "verbal",
    question: "Choose the antonym of Increase.",
    options: ["Grow", "Rise", "Decrease", "Expand"],
    correctAnswer: "Decrease",
  },
  {
    category: "verbal",
    question: "Choose the correct spelling.",
    options: ["Recieve", "Receive", "Receeve", "Receve"],
    correctAnswer: "Receive",
  },
  {
    category: "verbal",
    question: "Fill in the blank: She _____ to college every day.",
    options: ["go", "goes", "going", "gone"],
    correctAnswer: "goes",
  },
  {
    category: "verbal",
    question: "Identify the noun in: The boy is playing football.",
    options: ["playing", "is", "boy", "the"],
    correctAnswer: "boy",
  },
  {
    category: "verbal",
    question: "Choose the synonym of Big.",
    options: ["Small", "Large", "Tiny", "Little"],
    correctAnswer: "Large",
  },
  {
    category: "verbal",
    question: "Choose the antonym of Hot.",
    options: ["Warm", "Cold", "Heat", "Boil"],
    correctAnswer: "Cold",
  },
  {
    category: "verbal",
    question: "Fill in the blank: They _____ playing football.",
    options: ["is", "are", "am", "be"],
    correctAnswer: "are",
  },
  {
    category: "verbal",
    question: "Choose the correct spelling.",
    options: ["Beautiful", "Beautifull", "Beutiful", "Beautifal"],
    correctAnswer: "Beautiful",
  },
  {
    category: "verbal",
    question: "What is the antonym of Ancient?",
    options: ["Old", "Modern", "Historic", "Past"],
    correctAnswer: "Modern",
  },
  {
    category: "verbal",
    question: "Choose the synonym of Intelligent.",
    options: ["Smart", "Weak", "Slow", "Lazy"],
    correctAnswer: "Smart",
  },
  {
    category: "verbal",
    question: "Fill in the blank: I _____ a student.",
    options: ["is", "am", "are", "be"],
    correctAnswer: "am",
  },
  {
    category: "verbal",
    question: "Choose the correct spelling.",
    options: ["Environment", "Enviroment", "Environmant", "Enviornment"],
    correctAnswer: "Environment",
  },
  {
    category: "verbal",
    question: "What is the antonym of Early?",
    options: ["Fast", "Late", "Quick", "Soon"],
    correctAnswer: "Late",
  },
  {
    category: "verbal",
    question: "Choose the synonym of Begin.",
    options: ["Stop", "Start", "End", "Close"],
    correctAnswer: "Start",
  },
  {
    category: "verbal",
    question: "Fill in the blank: He _____ coffee every morning.",
    options: ["drink", "drinks", "drinking", "drank"],
    correctAnswer: "drinks",
  },
  {
    category: "verbal",
    question: "Identify the verb in: Birds fly in the sky.",
    options: ["Birds", "fly", "sky", "the"],
    correctAnswer: "fly",
  },
  {
    category: "verbal",
    question: "Choose the correct spelling.",
    options: ["Necessary", "Neccessary", "Necesary", "Necessery"],
    correctAnswer: "Necessary",
  },
  {
    category: "verbal",
    question: "What is the synonym of Quick?",
    options: ["Slow", "Fast", "Weak", "Late"],
    correctAnswer: "Fast",
  },
  {
    category: "verbal",
    question: "Choose the antonym of Strong.",
    options: ["Powerful", "Weak", "Mighty", "Hard"],
    correctAnswer: "Weak",
  },
  {
    category: "verbal",
    question: "Fill in the blank: We _____ happy.",
    options: ["is", "am", "are", "be"],
    correctAnswer: "are",
  },
  {
    category: "verbal",
    question: "Choose the correct spelling.",
    options: ["Government", "Goverment", "Govenment", "Governmant"],
    correctAnswer: "Government",
  },
  {
    category: "verbal",
    question: "What is the synonym of Silent?",
    options: ["Noisy", "Quiet", "Loud", "Angry"],
    correctAnswer: "Quiet",
  },
  {
    category: "verbal",
    question: "Choose the antonym of Accept.",
    options: ["Receive", "Reject", "Take", "Agree"],
    correctAnswer: "Reject",
  },
  {
    category: "verbal",
    question: "Fill in the blank: The sun _____ in the east.",
    options: ["rise", "rises", "rising", "rose"],
    correctAnswer: "rises",
  },
  {
    category: "verbal",
    question: "Identify the adjective in: She has a beautiful dress.",
    options: ["She", "has", "beautiful", "dress"],
    correctAnswer: "beautiful",
  },
  {
    category: "verbal",
    question: "Choose the correct spelling.",
    options: ["Knowledge", "Knowlege", "Knowladge", "Knolwedge"],
    correctAnswer: "Knowledge",
  },
  {
    category: "verbal",
    question: "What is the synonym of Brave?",
    options: ["Cowardly", "Courageous", "Weak", "Afraid"],
    correctAnswer: "Courageous",
  },
  {
    category: "verbal",
    question: "Choose the antonym of Clean.",
    options: ["Pure", "Dirty", "Neat", "Fresh"],
    correctAnswer: "Dirty",
  },
  {
    category: "verbal",
    question: "Fill in the blank: She _____ her homework yesterday.",
    options: ["do", "does", "did", "doing"],
    correctAnswer: "did",
  },
  {
    category: "verbal",
    question: "Choose the synonym of Difficult.",
    options: ["Easy", "Hard", "Simple", "Clear"],
    correctAnswer: "Hard",
  },
  {
    category: "verbal",
    question: "Choose the correct spelling.",
    options: ["Separate", "Seperate", "Seperete", "Separete"],
    correctAnswer: "Separate",
  },
  {
    category: "verbal",
    question: "What is the antonym of Victory?",
    options: ["Win", "Success", "Defeat", "Prize"],
    correctAnswer: "Defeat",
  },
  {
    category: "verbal",
    question: "Fill in the blank: They _____ to school yesterday.",
    options: ["go", "goes", "went", "going"],
    correctAnswer: "went",
  },
  {
    category: "verbal",
    question: "Identify the pronoun in: He is my best friend.",
    options: ["He", "is", "best", "friend"],
    correctAnswer: "He",
  },
  {
    category: "verbal",
    question: "Choose the synonym of Honest.",
    options: ["Truthful", "Dishonest", "Lazy", "Rude"],
    correctAnswer: "Truthful",
  },
  {
    category: "verbal",
    question: "Choose the antonym of Rich.",
    options: ["Wealthy", "Poor", "Money", "Gold"],
    correctAnswer: "Poor",
  },
  {
    category: "verbal",
    question: "Choose the correct spelling.",
    options: ["Accommodation", "Accomodation", "Acommodation", "Accommadation"],
    correctAnswer: "Accommodation",
  },
  {
    category: "verbal",
    question: "Fill in the blank: I have _____ apple.",
    options: ["a", "an", "the", "no"],
    correctAnswer: "an",
  },
  {
    category: "verbal",
    question: "What is the synonym of Angry?",
    options: ["Happy", "Furious", "Calm", "Quiet"],
    correctAnswer: "Furious",
  },
  {
    category: "verbal",
    question: "Choose the antonym of Maximum.",
    options: ["Highest", "Minimum", "Largest", "Greatest"],
    correctAnswer: "Minimum",
  },
  {
    category: "verbal",
    question: "Fill in the blank: The children _____ playing.",
    options: ["is", "am", "are", "was"],
    correctAnswer: "are",
  },
  {
    category: "verbal",
    question: "Choose the correct spelling.",
    options: ["Definitely", "Definately", "Definetely", "Definitly"],
    correctAnswer: "Definitely",
  },
  {
    category: "verbal",
    question: "What is the synonym of Help?",
    options: ["Assist", "Harm", "Stop", "Block"],
    correctAnswer: "Assist",
  },
  {
    category: "verbal",
    question: "Choose the antonym of Open.",
    options: ["Unlock", "Close", "Start", "Begin"],
    correctAnswer: "Close",
  },
  {
    category: "verbal",
    question: "Fill in the blank: My father _____ a car.",
    options: ["have", "has", "having", "had been"],
    correctAnswer: "has",
  },
  {
    category: "verbal",
    question: "Identify the adverb in: He runs quickly.",
    options: ["He", "runs", "quickly", "none"],
    correctAnswer: "quickly",
  },
  {
    category: "verbal",
    question: "Choose the correct spelling.",
    options: ["Restaurant", "Resturant", "Restaurent", "Restorant"],
    correctAnswer: "Restaurant",
  },
  {
    category: "verbal",
    question: "Choose the synonym of Famous.",
    options: ["Unknown", "Popular", "Hidden", "Secret"],
    correctAnswer: "Popular",
  },
  {
    category: "verbal",
    question: "Choose the antonym of Love.",
    options: ["Like", "Hate", "Care", "Respect"],
    correctAnswer: "Hate",
  },
];

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Question.deleteMany({});

    console.log("Old questions deleted");

    await Question.insertMany(questions);

    console.log("150 questions added successfully!");

    mongoose.connection.close();

  } catch (error) {
    console.log(error);

    mongoose.connection.close();
  }
};

seedQuestions();