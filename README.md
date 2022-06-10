# proj-2056
Test proj4leaflet @ EPSG2056

## proj4leaflet
Project [proj4leaflet](https://github.com/kartena/Proj4Leaflet) allows use of any crs with leaflet.

## EPSG 2056
Tried to use with EPSG2056 fails:
```
const crs = new L.Proj.CRS(
            "EPSG:2056",
            "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs",
            {
                // https://api3.geo.admin.ch/services/sdiservices.html#gettile
                resolutions: [4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000,1750, 1500, 1250, 1000, 750, 650, 500, 250, 100, 50, 20, 10, 5,2.5, 2, 1.5, 1, 0.5, 0.25, 0.1]
            }
        );
```

Resolutions from here: [](https://api3.geo.admin.ch/services/sdiservices.html#gettile)
WMTS-Serfvice: [Swisstopo]()

```
        this.map = L.map("map", {
            crs: crs,
            worldCopyJump: false,
            center: new L.LatLng(46.956589680879944, 7.453193664550781),
            zoom: 15
        });

        const colorLayer = L.tileLayer(
            "https://wmts3.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/2056/{z}/{x}/{y}.png",
            {
                maxZoom: 28,
                minZoom: 14,
                attribution: '&copy; <a href="http://www.swisstopo.ch">SwissTopo</a>',
               // bounds: L.latLngBounds(this.map.unproject([2420000, 1030000]), this.map.unproject([2900000, 1350000]))
            }
        ).addTo(this.map);
```

No tiles are shown, wmt-service responds with 400 Bad Request, because negative value for {TileCol} is requested:

`https://wmts3.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/2056/15/19/-10.png`


## project/unproject
When projecting/unprojecting center coords, strange values are returned:

```
console.log(this.map.unproject([2601108, 1200612])); // y,x
console.log(this.map.project(new L.LatLng(46.956589680879944, 7.453193664550781))); // lat, lon

```

yields:

```
Object { lat: -43.38015025407477, lng: 7.43868997263668 }
Object { x: 5202.216766371772, y: -2401.224596293147 }
```
After hours of fiddling with this, I can't seem to figure out proper way to use this.