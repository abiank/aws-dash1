first=httpget(_CONFIG.corsproxyserver,80,"/api.awsnow.info/ec2/linux/?format=json");
if (first.indexOf("Exception, check")>-1) {alert("Cant download data.");return 0}
try{fobj=JSON.parse(first);} catch(e) {alert("Cant parse data."); return 0}
console.log(fobj);
res=(fobj.results);
totcount=fobj.count;
count=fobj.results.length;
console.log(fobj.next);
next=(fobj.next);
while (count<totcount)
{
console.log("count:"+count+" totcount:" +totcount);
others=httpget(_CONFIG.corsproxyserver,80,next.replace("http:/","")); // Just one slash please..
if (others.indexOf("Exception, check")>-1) {alert("Cant download data.");return 0}
try{obj=JSON.parse(others);} catch(e) {alert("Cant parse data."); return 0}

res=res.concat(obj.results);
count+=obj.results.length;
console.log(obj.next);
next=(obj.next);

}

bigcsv = res.map(function(e){return [e.region,e.instance,e.option,e.tenancy,e.price]}).map(function(e){return e.join(",")}).join("\n")
Importcsv(bigcsv,0,2)