import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Point } from 'proj4';
import 'proj4leaflet'

/*
    IMPORTANT: Don't forget to include the leaflet.css in
    angular.json!

    "styles": [
        "./node_modules/leaflet/dist/leaflet.css",

    then restart: npm start
*/

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css']
})
export class LeafletComponent implements AfterViewInit {
    private map!: L.Map;
    constructor() {

    }

    ngAfterViewInit(): void {
        //this.initMap(); // openstreetmap, EPSG 4837
        this.initMap2056() // swisstopo, EPSG 2056
    }

    initMap() : void {
        // google csr
        this.map = L.map('map', {
            center: [46.956589680879944, 7.453193664550781],
            zoom: 12,
          });

          const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          });

          tiles.addTo(this.map);

          this.map.on("click", (e: any) => {
            console.log(e.latlng);
            console.log(this.map.project(e.latlng));
        });
    }

    initMap2056() {
        const crs = new L.Proj.CRS(
            "EPSG:2056",
            "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs",
            {
                // https://api3.geo.admin.ch/services/sdiservices.html#gettile
                resolutions: [4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000,1750, 1500, 1250, 1000, 750, 650, 500, 250, 100, 50, 20, 10, 5,2.5, 2, 1.5, 1, 0.5, 0.25, 0.1]
            }
        );

        // Center = Bern => y: 2601108 (North), x: 1200612 (East)
        // https://coordinates-converter.com/en/decimal/46.956590,7.453194?karte=OpenStreetMap&zoom=8
        this.map = L.map("map", {
            crs: crs,
            worldCopyJump: false,
            center: new L.LatLng(46.956589680879944, 7.453193664550781),
            zoom: 15
        });

        const colorLayer = L.tileLayer(
           // "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg",
            "https://wmts3.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/2056/{z}/{x}/{y}.png",
            {
                maxZoom: 28,
                minZoom: 14,
                attribution: '&copy; <a href="http://www.swisstopo.ch">SwissTopo</a>',
               // bounds: L.latLngBounds(this.map.unproject([2420000, 1030000]), this.map.unproject([2900000, 1350000]))
            }
        ).addTo(this.map);

        console.log("center");
        console.log(this.map.unproject([2601108, 1200612])); // y,x
        console.log(this.map.project(new L.LatLng(46.956589680879944, 7.453193664550781))); // lat, lon

/*
        this.map.on("click", (e: any) => {
            console.log(e.latlng);
            console.log(this.map.project(e.latlng));
        });
*/
    }
}

