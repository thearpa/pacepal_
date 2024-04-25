//komponent som gir en score til en rute basert på fuzzy logic

export const GiveRouteScore = (
  distance: number,
  slope: number,
  surface: string
) => {
  var distanceScore = 0;
  var slopeScore = 0;
  var surfaceScore = 0;

  const wantedDistnace: string = localStorage.getItem("wantedDistance")!;
  const wantedSlope: string = localStorage.getItem("wantedSlope")!;
  const wantedSurface: string = localStorage.getItem("wantedSurface")!;
  const distanceFuzzy: number = +localStorage.getItem("FuzzyDistance")!;
  const slopeFuzzy: number = +localStorage.getItem("FuzzySlope")!;
  const surfaceFuzzy: number = +localStorage.getItem("FuzyySurface")!;
  console.log("SurfaceFuzzy" + localStorage.getItem("FuzzySurface"));

  console.log(wantedDistnace);
  console.log(wantedSlope);

  if (wantedDistnace === "Any length") {
    let distVar = 0;
    distanceScore = distVar;
  } else {
    let distVar = Math.abs(parseInt(wantedDistnace) * 1000 - distance); //Forskjellen på avstandene
    console.log("Distance " + distance);
    console.log("DistVar:" + distVar);

    let distScore = (distanceFuzzy / 10) * (distVar / 10); //Ganger forskjellen med FuzzyVariabel, Deler på 100 i fht. slope
    console.log("DistScore:" + distScore);
    distanceScore = distScore;
  }

  // over 150 er kupert

  if (wantedSlope === "Any") {
    slopeScore = 0;
  } else if (
    (wantedSlope === "Flat" && slope <= 150) ||
    (wantedSlope === "Hill" && slope >= 150)
  ) {
    slopeScore = 0;
  } else {
    let slopeVar = 1000; //Forskjellen på avstandene
    let slScore = (slopeFuzzy / 10) * slopeVar;
    slopeScore = slScore;
  }

  if (wantedSurface === surface || wantedSurface === "Any") {
    let surfaceVar = 0; //Vil ha så lite tall som mulig
    let surfScore = (surfaceFuzzy / 10) * surfaceVar;
    surfaceScore = surfScore;
    console.log("SurfaceScore" + surfaceFuzzy);
  } else {
    let surfaceVar = 100;
    let surfScore = (surfaceFuzzy / 10) * surfaceVar;
    surfaceScore = surfScore;
  }

  const totalScore = distanceScore + slopeScore + surfaceScore;
  console.log("totalScore:" + totalScore);

  return totalScore;
};
