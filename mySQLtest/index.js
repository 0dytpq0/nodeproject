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
  let sql =
    "SELECT ifnull(ID, '') ID , ifnull(Address, '') Address , ifnull(Area, '') Area , ifnull(AreaType, '') AreaType , ifnull(CAttached, '') CAttached , ifnull(CName, '') CName , ifnull(CPhone, '') CPhone , ifnull(CPosition, '') CPosition , ifnull(DContent, '') DContent , ifnull(EAttached, '') EAttached , ifnull(EName, '') EName , ifnull(EPhone, '') EPhone , ifnull(EPoint, '') EPoint , ifnull(EPosition, '') EPosition , ifnull(ImagePath, '') ImagePath , ifnull(IssueDate, '') IssueDate , ifnull(Number, '') Number , ifnull(Owner, '') Owner , ifnull(Phone, '') Phone , ifnull(PointName, '') PointName , ifnull(PrintIndex, '') PrintIndex , ifnull(Purpose, '') Purpose , ifnull(RegistryDate, '') RegistryDate , ifnull(SPoint, '') SPoint , ifnull(RegNumber, '') RegNumber , ifnull(GpsNumber, '') GpsNumber" +
    ", ifnull(flagYN, '') flagYN from carinfoitems where Number = '" +
    carNo +
    "' limit 1";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/carinfoitemsall", (req, res) => {
  let { carNo } = req.query;
  let sql =
    "SELECT ifnull(ID, '') ID , ifnull(Address, '') Address , ifnull(Area, '') Area , ifnull(AreaType, '') AreaType , ifnull(CAttached, '') CAttached , ifnull(CName, '') CName , ifnull(CPhone, '') CPhone , ifnull(CPosition, '') CPosition , ifnull(DContent, '') DContent , ifnull(EAttached, '') EAttached , ifnull(EName, '') EName , ifnull(EPhone, '') EPhone , ifnull(EPoint, '') EPoint , ifnull(EPosition, '') EPosition , ifnull(ImagePath, '') ImagePath , ifnull(IssueDate, '') IssueDate , ifnull(Number, '') Number , ifnull(Owner, '') Owner , ifnull(Phone, '') Phone , ifnull(PointName, '') PointName , ifnull(PrintIndex, '') PrintIndex , ifnull(Purpose, '') Purpose , ifnull(RegistryDate, '') RegistryDate , ifnull(SPoint, '') SPoint , ifnull(RegNumber, '') RegNumber , ifnull(GpsNumber, '') GpsNumber" +
    ", ifnull(flagYN, '') flagYN from carinfoitems";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/disinfectionitems", (req, res) => {
  let sql =
    "SELECT ifnull(ID, '') ID , ifnull(Area, '') Area , ifnull(AreaType, '') AreaType , ifnull(DContent, '') DContent , ifnull(IssueDate, '') IssueDate , ifnull(PointName, '') PointName , ifnull(RegistryDate, '') RegistryDate" +
    "from disinfectionitems order by RegistryDate desc limit 1";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/disinfectionitemsall", (req, res) => {
  let sql =
    "SELECT ifnull(ID, '') ID , ifnull(Area, '') Area , ifnull(AreaType, '') AreaType , ifnull(DContent, '') DContent , ifnull(IssueDate, '') IssueDate , ifnull(PointName, '') PointName , ifnull(RegistryDate, '') RegistryDate" +
    "from disinfectionitems";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/operatoritems", (req, res) => {
  let { Type, Name } = req.query;
  let sql =
    "SELECT ifnull(ID, '') ID , ifnull(Attached, '') Attached , ifnull(IssueDate, '') IssueDate , ifnull(Name, '') Name , ifnull(Phone, '') Phone , ifnull(Position, '') Position , ifnull(RegistryDate, '') RegistryDate , ifnull(Type, '') Type" +
    "from operatoritems where Name = '" +
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
  let sql =
    "SELECT ifnull(ID, '') ID , ifnull(IssueDate, '') IssueDate , ifnull(Name, '') Name , ifnull(Value, '') Value" +
    "  from settingitems where Name = '" +
    Name +
    "' limit 1";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/operatoritemsallE", (req, res) => {
  let sql =
    "SELECT ifnull(ID, '') ID , ifnull(Attached, '') Attached , ifnull(IssueDate, '') IssueDate , ifnull(Name, '') Name , ifnull(Phone, '') Phone , ifnull(Position, '') Position , ifnull(RegistryDate, '') RegistryDate , ifnull(Type, '') Type" +
    " from operatoritems where Type='E'";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});
app.get("/operatoritemsallC", (req, res) => {
  let sql =
    "SELECT ifnull(ID, '') ID , ifnull(Attached, '') Attached , ifnull(IssueDate, '') IssueDate , ifnull(Name, '') Name , ifnull(Phone, '') Phone , ifnull(Position, '') Position , ifnull(RegistryDate, '') RegistryDate , ifnull(Type, '') Type" +
    " from operatoritems where Type ='C'";
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/settingitemsall", (req, res) => {
  let sql =
    "SELECT ifnull(ID, '') ID , ifnull(IssueDate, '') IssueDate , ifnull(Name, '') Name , ifnull(Value, '') Value " +
    "  from settingitems ";
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
// app.put("/settingitems/", (req, res) => {
//   let { Name, Value } = req.body;
//   if (req.body["Value"]) {
//     let sql = `
//      update settingitems SET Value = '${Value}' where Name = '${Name}'    `;
//     connection.query(sql, (error) => {
//       if (error) {
//         return res.send("FAIL");
//       }
//     });

//     return res.sendStatus(200);
//   }
// }); IP setting값 변경. name,value값 설정해서 해주면 된다.

var net = require("net");
let socket = null;
var str = "TIME20221201113500";
let bytes = []; // char codes
for (var i = 0; i < str.length; ++i) {
  var code = str.charCodeAt(i);

  bytes = bytes.concat([code]);
}
bytes.unshift(02);
bytes.push(03);
bytes = Buffer.from(bytes);

console.log("bytes", bytes);

// 서버 5000번 포트로 접속
let sql =
  "SELECT ifnull(ID, '') ID , ifnull(IssueDate, '') IssueDate , ifnull(Name, '') Name , ifnull(Value, '') Value" +
  "  from settingitems where Name = 'IP' limit 1";
connection.query(sql, (error, rows) => {
  if (error) throw error;

  console.log("rows", rows);
  let data = rows[0]?.Value;
  data = data?.replaceAll("`", '"');
  let parsedValue = JSON.parse(data);
  socket = net.connect({
    host: parsedValue.IP,
    port: Number(parsedValue.PORT),
  });
  socket?.on("connect", function () {
    console.log("connected to server!");

    // 1000ms의 간격으로 banana hong을 서버로 요청
    setInterval(function () {
      socket.write(bytes);
    }, 1000);
  });

  // 서버로부터 받은 데이터를 화면에 출력
  socket?.on("data", function (chunk) {
    console.log("recv:" + chunk.toString());
    //chunk가 있으면 OK를 보내줘야돤다.
  });
  // 접속이 종료됬을때 메시지 출력
  socket?.on("end", function () {
    console.log("disconnected.");
  });
  // 에러가 발생할때 에러메시지 화면에 출력
  socket?.on("error", function (err) {
    console.log(err);
  });
  // connection에서 timeout이 발생하면 메시지 출력
  socket?.on("timeout", function () {
    console.log("connection timeout.");
  });
  console.log(
    "parsedValue.IP, parsedValue.PORT",
    parsedValue.IP,
    parsedValue.PORT
  );
});

console.log("socket", socket);

app.listen(app.get("port"), () => {});
