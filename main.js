status = ""
object_name = ""
objects = []
video = ""
function setup()
{
    canvas = createCanvas(480, 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(480, 380)
    video.hide()
}
function draw()
{
    image(video, 0, 0, 480, 380)
    if (status != "")
        {
            objectDetector.detect(video, gotResult)
            for (i = 0; i < objects.length; i++)
            {
                fill("#FF0000")
                percent = floor(object[i].confidence * 100)
                text(objects[i].label + "" + percent + "%" + objects[i].x + 15 + objects[i].y + 15)
                noFill()
                stroke("#FF0000")
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
                if (objects[i].label == object_name)
                {
                    video_webcamLiveView.stop()
                    objectDetector.detect(gotResult)
                    document.getElementById("status").innerHTML = "Status: Objects Detected"
                }
                else
                {
                    document.getElementById("status").innerHTML = "Status: Not Detected"
                }
            }
        }
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
    object_name = document.getElementById("input").innerHTML
    console.log(object_name)
}
function modelLoaded()
{
    console.log("model loaded")
    status = true
}
function gotResult(error, results)
{
    if (error)
        {
            console.log(error)
        }
    console.log(results)
    objects = results
}