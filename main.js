import ChartJsView from 'osh-js/source/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/source/core/ui/layer/CurveLayer.js';
import SosGetResult from 'osh-js/source/core/datasource/sos/SosGetResult.datasource';

let chartDataSource = new SosGetResult("doseRate", {
    endpointUrl: "localhost:8181/sensorhub/sos",
    offeringID: "KROMEK_D5:D5M100190",
    observedProperty: "http://sensorml.com/ont/swe/property/KromekDetectorRadiometricsV1Report",
    startTime: "now",
    endTime: "2055-01-01Z"
});

// #region snippet_curve_layer
let doseRateLayerCurve = new CurveLayer({
    dataSourceId: chartDataSource.id,
    getValues: (rec, timeStamp) => {
        return {
            x: timeStamp,
            y: rec.doseRate
        }
    },
    lineColor: 'rgba(38,152,255,0.5)',
    getLineColor: (rec) => 'rgba(38,152,255,0.5)',
    fill: true,
    backgroundColor: 'rgba(169,212,255,0.5)',
    getBackgroundColor: (rec) => 'rgba(38,152,255,0.5)',
    maxValues: 20,
    name: 'Dose Rate (uSv/h)'
});
// #endregion snippet_curve_layer

// show it in video view
let chartView = new ChartJsView({
    container: 'chart-container',
    layers: [doseRateLayerCurve],
    css: "chart-view",
    options: {
        scales: {
            y: {
                title: {
                    display : true,
                    text: "Dose Rate (uSv/h)s",
                    padding: 20
                }
            },
        }
    },
    datasetOptions: {
        tension: 0.2 // for 'line'
    }
});

// start streaming
chartDataSource.connect();
