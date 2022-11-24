const express = require("express");
const mysql = require("mysql");
const dbconfig = require("./config/database.js");
const connection = mysql.createConnection(dbconfig);
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.set("port", process.env.PORT || 4000);

app.get("/", (req, res) => {
  res.send("Root");
});

app.get("/carinfoitems", (req, res) => {
  let { carNo } = req.query;
  let sql = "SELECT * from carinfoitems where Number = '" + carNo + "' limit 1";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/carinfoitemsall", (req, res) => {
  let { carNo } = req.query;
  let sql = "SELECT * from carinfoitems";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/disinfectionitems", (req, res) => {
  let sql =
    "SELECT * from disinfectionitems order by RegistryDate desc limit 1";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/disinfectionitemsall", (req, res) => {
  let sql = "SELECT * from disinfectionitems";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/operatoritems", (req, res) => {
  let { Type, Name } = req.query;
  let sql =
    "SELECT * from operatoritems where Name = '" +
    Name +
    "' and Type = '" +
    Type +
    "'  order by RegistryDate desc limit 1";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/settingitems", (req, res) => {
  let { Name } = req.query;
  let sql = "SELECT * from settingitems where Name = '" + Name + "' limit 1";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/operatoritemsall", (req, res) => {
  let sql = "SELECT * from operatoritems ";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/settingitemsall", (req, res) => {
  let sql = "SELECT * from settingitems ";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.post("/operatoritems", (req, res) => {
  let { Attached, Name, Phone, Position, Type } = req.body;

  let sql =
    " Insert into operatoritems ( Attached, IssueDate, Name, Phone, Position, RegistryDate, Type) ";
  sql += ` value("${Attached}",now(), "${Name}", "${Phone}", "${Position}", now(), "${Type}") `;
  connection.query(sql, (error, rows) => {
    if (error) throw error;
  });

  return res.sendStatus(200);
});

app.post("/operatoritems", (req, res) => {
  let { Attached, Name, Phone, Position, Type } = req.body;

  let sql =
    " Insert into operatoritems ( Attached, IssueDate, Name, Phone, Position, RegistryDate, Type) ";
  sql += ` value("${Attached}",now(), "${Name}", "${Phone}", "${Position}", now(), "${Type}") `;
  connection.query(sql, (error) => {
    if (error) throw error;
  });

  return res.sendStatus(200);
});

app.post("/carinfoitems", (req, res) => {
  let {
    Address,
    Area,
    AreaType,
    CAttached,
    CName,
    CPhone,
    CPosition,
    DContent,
    EAttached,
    EName,
    EPhone,
    EPoint,
    EPosition,
    ImagePath,
    Number,
    Owner,
    Phone,
    PointName,
    PrintIndex,
    Purpose,
    SPoint,
    RegNumber,
    GpsNumber,
    flagYN,
  } = req.body;

  let sql = `
  Insert into carinfoitems ( Address,Area,AreaType,CAttached,CName,CPhone,CPosition
,DContent,EAttached,EName,EPhone,EPoint,EPosition,ImagePath,IssueDate,Number,Owner,Phone,PointName
,PrintIndex,Purpose,RegistryDate,SPoint,RegNumber,GpsNumber,flagYN) 
`;
  sql += ` value("${Address}","${Area}","${AreaType}","${CAttached}","${CName}","${CPhone}","${CPosition}"
  ,"${DContent}","${EAttached}","${EName}","${EPhone}","${EPoint}","${EPosition}","${ImagePath}",now(),"${Number}","${Owner}","${Phone}","${PointName}"
  ,"${PrintIndex}","${Purpose}",now(),"${SPoint}","${RegNumber}","${GpsNumber}","${flagYN}") `;
  connection.query(sql, (error) => {
    if (error) throw error;
  });

  return res.sendStatus(200);
});

app.post("/disinfectionitems", (req, res) => {
  let { Area, AreaType, DContent, PointName } = req.body;

  let sql =
    " Insert into disinfectionitems (Area, AreaType, DContent, IssueDate, PointName, RegistryDate) ";
  sql += ` value("${Area}", "${AreaType}", "${DContent}",now(), "${PointName}", now()) `;
  connection.query(sql, (error) => {
    if (error) throw error;
  });

  return res.sendStatus(200);
});

app.post("/settingitems", (req, res) => {
  let { Name, Value } = req.body;

  let sql = " Insert into settingitems ( IssueDate,Name,Value) ";
  sql += ` value(now(), "${Name}", "${Value}") `;
  connection.query(sql, (error) => {
    if (error) throw error;
  });

  return res.sendStatus(200);
});

app.put("/disinfectionitems/:Name", (req, res) => {
  var Name = req.params.Name;
  if (
    req.body["tDConten"] ||
    req.body["Area"] ||
    req.body["AreaType"] ||
    req.body["PointName"]
  ) {
    let { DContent, Area, AreaType, PointName } = req.body;
    let sql = `
     update disinfectionitems SET DContent = '${DContent}', Area = '${Area}', AreaType = '${AreaType}', PointName = '${PointName}' where ID = ${ID}
     
    `;
    connection.query(sql, (error) => {
      if (error) {
        return res.send("FAIL");
      }
    });

    return res.sendStatus(200);
  }
});

app.put("/carinfoitems/:ID", (req, res) => {
  var ID = req.params.ID;

  if (
    req.body["Number"] ||
    req.body["CName"] ||
    req.body["DContent"] ||
    req.body["Owner"]
  ) {
    let { Number, CName, DContent, Owner } = req.body;
    let sql = `
       update carinfoitems SET Number = '${Number}', CName = '${CName}', DContent = '${DContent}', Owner = '${Owner}' where ID = ${ID}
       
      `;
    connection.query(sql, (error) => {
      if (error) {
        return res.send("FAIL");
      }
    });

    return res.sendStatus(200);
  }
});

app.put("/operatoritems/:ID", (req, res) => {
  var ID = req.params.ID;

  if (
    req.body["Name"] ||
    req.body["Phone"] ||
    req.body["Position"] ||
    req.body["Attached"]
  ) {
    let { Name, Phone, Position, Attached } = req.body;
    let sql = `
       update operatoritems SET Name = '${Name}', Phone = '${Phone}', Position = '${Position}', Attached = '${Attached}' where ID = ${ID}
       
      `;
    connection.query(sql, (error) => {
      if (error) {
        return res.send("FAIL");
      }
    });

    return res.sendStatus(200);
  }
});

app.put("/settingitems/", (req, res) => {
  let { Name, Value } = req.body;
  console.log("req", req);
  console.log("Name,Value", Name, Value);
  if (req.body["Value"]) {
    console.log("Value", req.body["Value"]);
    let sql = `
     update settingitems SET Value = '${Value}' where Name = '${Name}'    `;
    connection.query(sql, (error) => {
      if (error) {
        return res.send("FAIL");
      }
    });

    return res.sendStatus(200);
  }
});

app.listen(app.get("port"), () => {});
