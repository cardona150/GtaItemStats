// This is a waste of space
$("#banner-GTAV").remove()

// This really isn't necessary
$("#getApp").remove()

// Personally, I don't like this
$("#summaryStats").remove()

var sectionSinglePlayerObserver = new MutationObserver(SectionSinglePlayerObserverMutationsCallback)
sectionSinglePlayerObserver.observe(document.getElementById("sectionSinglePlayer"), {childList:true, subtree:true})
function SectionSinglePlayerObserverMutationsCallback(mutations, observer)
{
  for(const mutation of mutations)
  {
    for(const addedNode of mutation.addedNodes)
    {
      if(addedNode.id=="vehicleTypes")
      {
        // TODO: This is messing up the "GARAGE" tab
        vehicleTypes()
      }
      if(addedNode.id=="gunTypes")
      {
        gunTypes()
      }
    }
  }
}

function vehicleTypes() {
  table = $(`
  <table id="gtavie">
    <thead>
      <tr>
        <th data-sort="string" data-sort-default="desc">Name</th>
        <th data-sort="float" data-sort-default="desc">Speed</th>
        <th data-sort="float" data-sort-default="desc">Acceleration</th>
        <th data-sort="float" data-sort-default="desc">Braking</th>
        <th data-sort="float" data-sort-default="desc">Handling</th>
        <th data-sort="float" data-sort-default="desc" data-sort-onload=yes>S+A</th>
        <th data-sort="float" data-sort-default="desc">S+A+H</th>
        <th data-sort="float" data-sort-default="desc">S+A+B+H</th>
      </tr>
    </thead>
  </table>`)
  
  body = $("<tbody></tbody>")
  table.append(body)

  $("#vehicleTypes .vehicle").each(function(index, value) {
    row = $("<tr></tr>")
    body.append(row)

    row.append(`<td>${$(value).attr("data-name")}</td>`)
    speed = Number($(value).attr("data-speed"))
    row.append(`<td>${fixed(speed)}</td>`)
    acceleration = Number($(value).attr("data-acceleration"))
    row.append(`<td>${fixed(acceleration)}</td>`)
    braking = Number($(value).attr("data-braking"))
    row.append(`<td>${fixed(braking)}</td>`)
    handling = Number($(value).attr("data-handling"))
    row.append(`<td>${fixed(handling)}</td>`)
    
    row.append(`<td>${fixed(speed+acceleration)}</td>`)
    row.append(`<td>${fixed(speed+acceleration+handling)}</td>`)
    row.append(`<td>${fixed(speed+acceleration+braking+handling)}</td>`)

    body.append(row)
  })

  table.stupidtable()
  //$(".gridRow").replaceWith(table)
  $("#vehicleTypes").replaceWith(table)
}

function gunTypes() {
  table = $(`
  <table id="gtavie">
    <thead>
      <tr>
        <th data-sort="string" data-sort-default="desc">Name</th>
        <th data-sort="float" data-sort-default="desc">Damage</th>
        <th data-sort="float" data-sort-default="desc">Fire Rate</th>
        <th data-sort="float" data-sort-default="desc">Accuracy</th>
        <th data-sort="float" data-sort-default="desc">Range</th>
        <th data-sort="float" data-sort-default="desc">Clip Size</th>
        <th data-sort="float" data-sort-default="desc" data-sort-onload=yes>D+F</th>
        <th data-sort="float" data-sort-default="desc">D+F+A</th>
        <th data-sort="float" data-sort-default="desc">D+F+C</th>
        <th data-sort="float" data-sort-default="desc">D+F+A+R+C</th>
      </tr>
    </thead>
  </table>`)
  
  body = $("<tbody></tbody>")
  table.append(body)

  $("#gunTypes .weapon").each(function(index, value) {
    row = $("<tr></tr>")
    body.append(row)

    row.append(`<td>${$(value).attr("data-name")}</td>`)

    progressBars = $(".progress-bar", this)

    damage = Number($(".under", this)[0].innerText.slice(0, -1))
    row.append(`<td>${damage}</td>`)

    fireRate = Number($(".under", this)[1].innerText.slice(0, -1))
    row.append(`<td>${fireRate}</td>`)

    if(progressBars.length == 3)
    {
      accuracy = 0
    }
    else
    {
      accuracy = Number($(".under", this)[2].innerText.slice(0, -1))
    }
    row.append(`<td>${accuracy}</td>`)

    if(progressBars.length == 3)
    {
      range = Number($(".under", this)[2].innerText.slice(0, -1))
    }
    else
    {
      range = Number($(".under", this)[3].innerText.slice(0, -1))
    }
    row.append(`<td>${range}</td>`)

    if(progressBars.length != 5)
    {
      clipSize = 0
    }
    else
    {
      clipSize = Number($(".under", this)[4].innerText.slice(0, -1))
    }
    row.append(`<td>${clipSize}</td>`)

    row.append(`<td>${damage+fireRate}</td>`)
    row.append(`<td>${damage+fireRate+accuracy}</td>`)
    row.append(`<td>${damage+fireRate+clipSize}</td>`)
    row.append(`<td>${damage+fireRate+accuracy+range+clipSize}</td>`)

    body.append(row)
  })

  table.stupidtable()
  $("#gunTypes").replaceWith(table)
}

function fixed(x)
{
  return x.toFixed(5)
}