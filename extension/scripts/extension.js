// #vehicleContent loads after document_idle

var observer = new MutationObserver(MutationsCallback)
observer.observe(document.getElementById("sectionSinglePlayer"), {childList:true, subtree:true})
function MutationsCallback(mutations, observer)
{
  for(const mutation of mutations)
  {
    for(const addedNode of mutation.addedNodes)
    {
      if(addedNode.id=="vehicleTypes")
      {
        // BINGO
        vehicleTypes()
      }
    }
  }
}

function vehicleTypes() {
  table = $(`
  <table id="gtavie">
    <thead>
      <tr>
        <th data-sort="string">Name</th>
        <th data-sort="float">Speed</th>
        <th data-sort="float">Acceleration</th>
        <th data-sort="float">Braking</th>
        <th data-sort="float">Handling</th>
        <th data-sort="float" data-sort-default="desc" data-sort-onload=yes>S+A</th>
        <th data-sort="float">S+A+B</th>
        <th data-sort="float">S+A+H</th>
        <th data-sort="float">S+A+B+H</th>
      </tr>
    </thead>
  </table>`)
  
  body = $("<tbody></tbody>")
  table.append(body)

  $(".vehicle").each(function(index, value) {
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
    row.append(`<td>${fixed(speed+acceleration+braking)}</td>`)
    row.append(`<td>${fixed(speed+acceleration+handling)}</td>`)
    row.append(`<td>${fixed(speed+acceleration+braking+handling)}</td>`)

    body.append(row)
  })

  table.stupidtable()
  $(".gridRow").replaceWith(table)
}

function fixed(x)
{
  return x.toFixed(5)
}