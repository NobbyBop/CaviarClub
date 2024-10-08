import { ObjectId } from "mongodb";
import xss from "xss"

export function createDateString(date) {
  //takes a javascript date and converts it to mm/dd/yyyy DOES NOT TYPECHECK!!!!
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let dateString = "";
  if (month > 9) dateString = `${month}/${day}/${year}`;
  else dateString = `0${month}/${day}/${year}`;
  return xss(dateString);
}

export function checkString(string) {
  if (string === undefined) throw new Error("Nothing passed into checkString");
  if (typeof string !== "string")
    throw new Error("Non-string passed into checkString");
  string = string.trim();
  if (string.length <= 0)
    throw new Error("Empty string passed into checkString");
  return xss(string);
}

export function checkId(Id) {
  if (Id === undefined) throw new Error("Nothing passed into checkId");
  if (typeof Id !== "string") throw new Error("Non-string passed into checkId");
  Id.trim();
  if (Id.length <= 0) throw new Error("Empty string passed into checkId");
  if (!ObjectId.isValid(Id)) throw new Error("Invalid ID passed to checkId");
  return xss(Id);
}

export function checkRating(rating) {
  if (rating === undefined) throw new Error("Nothing passed into checkRating");
  if (typeof rating !== "number")
    throw new Error("Non-number passed into checkRating");
  if (!(0 <= rating) && !(rating <= 5))
    throw new Error("Rating must be a number from 0 to 5");
  if (!Number.isInteger(rating)) {
    if (rating.toString().split(".")[1].length > 1)
      throw new Error("Rating must have no more than 1 decimal place.");
  }
  // if(rating !== xss(rating)) throw new Error("XSS attack!")
}

export function checkTags(tags) {
  if (tags === undefined)
    throw new Error("No tag array was supplied to checkTags");
  if (!Array.isArray(tags)) throw new Error("Must pass an array(!) of tags");
  try {
    if (!tags.length === 0) {
      tags.map((tag) => xss(checkString(tag)));
    }
  } catch {
    throw new Error("Tags does not consist of an array of strings");
    //simply doing this try catch so that if it errors in there then this function will throw new Error(the error instead
    //i'd imagine thats less confusing, lmk if otherwise -Messina
  }
}

export function checkEmail(email) {
  if (email === undefined) throw new Error("Nothing passed into checkEmail");
  if (typeof email !== "string")
    throw new Error("Non-string passed into checkEmail");
  email = email.trim();
  if (email.length === 0) throw new Error("Empty email!");
  if (!/^[\w\.-]+@[\w\.-]+\.(com|edu|gov|net|org)$/.test(email))
    throw new Error("Invalid email!");
  return xss(email);
}
//check domain is only used inside of check email
function checkDomain(domain) {
  const webSplit = domain.split(".");
  if (webSplit[1] !== "com" || webSplit[0].length < 5)
    //THIS IS HOW WE CHECKED WEBSITES IN LAB 6 SO IT IS HOW I AM CHECKING HERE.
    throw new Error("Not a valid website");
}

export const vInt = (num) => {
  if (num === undefined || typeof num !== "number" || Number.isNaN(num)) {
    throw new Error("Not a number!");
  }
  if (!Number.isInteger(num)) throw new Error("Not an integer!");
  return xss(num);
};

export const checkUser = (str) => {
  if (str === undefined) throw "Userame not provided!";
  if (typeof str !== "string") throw "Username not a string!";
  str = str.trim();
  if (str.length === 0) throw "Username not provided!";
  if (str.length < 5 || str.length > 10)
    throw "Username must be between 5 and 10 characters!";
  return xss(str.toLowerCase());
};

export const checkPass = (str) => {
  if (str === undefined) throw "Password not provided!";
  if (typeof str !== "string") throw "Password not a string!";
  str = str.trim();
  if (str.length === 0) throw "Password not provided!";
  if (
    !/^(?!.*\s)(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      str
    )
  )
    throw "Password does not meet requirements!";
  return xss(str);
};

export const checkImage = (str) => {
  // Pictures are allowed to not exist, or not be provided into the function.
  if (str === undefined) return undefined;
  if (typeof str !== "string") throw new Error("Image must be represented as a string.");
  str = str.trim();
  // If the picture doesn't exist, that is fine.
  if (str.length === 0) return undefined;
  try {
      const binaryData = atob(str);
      if (!binaryData.startsWith('\x89PNG\r\n\x1a\n')) throw new Error("Image must be a PNG!");
      return xss(str);
  } catch (e) {
      throw new Error("Image must be a PNG!");
  }

}
