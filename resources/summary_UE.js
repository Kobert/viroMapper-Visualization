// Data access
// function goto_data(){
// window.open("list.html","_self")
// }




function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


function clone_trace(in_trace){
    
    var out_trace = {};
    
    if('type' in in_trace){
    out_trace.type = in_trace.type;
    }
    
    if('mode' in in_trace){
    out_trace.mode = in_trace.mode;
    }
    
    if('marker' in in_trace){
//     if('size' in in_trace.marker){
    out_trace.marker  = { size: 2 };
    }
    
    
    if('y' in in_trace){
    out_trace.y = in_trace.y.slice();
    }
    
    if('name' in in_trace){
    out_trace.name = in_trace.name;
    }
    
    if('text' in in_trace){
    out_trace.text = in_trace.text;
    }
    
    return out_trace;
    
}



function handle_plotly_click(i){
    display_point_i(i);
//   goto_data_i(i);   
}

function display_point_i(i){
    single_point_shown = true; 
    var el = document.getElementById('data_point_box');
    var el_table = document.getElementById('table_header');
    
    document.getElementById('data_point_button').href = "./resources/list.html#l"+i;

    var headers = el_table.getElementsByTagName('th');
    var rows    = el_table.getElementsByTagName('td');

    for(var j=0; j < rows.length; j++){

    switch (headers[j].innerHTML){
            case "Position":
                rows[j].innerHTML = ""+i;
                break;
            case "As":
                rows[j].innerHTML = ""+As[i];
                break;
            case "Cs":
                rows[j].innerHTML = ""+Cs[i];
                break;
            case "Gs":
                rows[j].innerHTML = ""+Gs[i];
                break;
            case "Ts":
                rows[j].innerHTML = ""+Ts[i];
                break;
            case "Ns":
                rows[j].innerHTML = ""+Ns[i];
                break;
            case "coverage":
                rows[j].innerHTML = ""+coverage[i];
                break;
            case "majorsequence":
                rows[j].innerHTML = ""+majorsequence[i];
                break;
            case "majorbase_ratio":
                rows[j].innerHTML = ""+majorbase_ratio[i];
                break;
            case "secondbase":
                rows[j].innerHTML = ""+secondbase[i];
                break;
            case "secondbase_ratio":
                rows[j].innerHTML = ""+secondbase_ratio[i];
                break;
            case "probability_of_seq_error":
                rows[j].innerHTML = ""+probability_of_seq_error[i];
                break;
            case "expected_number_of_errors":
                rows[j].innerHTML = ""+expected_number_of_errors[i];
                break;
            default:
                rows[j].innerHTML = "NOT-FOUNT ("+headers[j].innerHTML+")";
                break;
        }   
        
        
    }
    el.style.display = 'block';
     
    single_point_shown = true;    

    update_consensus_position();
}



function goto_data_i(i){

if(!confirm("Show underlying data-file?\n(This may take a while to load)"))
{return;}

var target = "resources/list.html#l"+i;
window.open(target,"_self")
// window.open("list.html#l42797","_self")
}


function go_to_line(max_line){
        var new_location = '#l';
        var x = Number(document.getElementById("input_target_line").value)
        if(!Number.isInteger(x) || x < 0 || x > max_line) 
        {
        return false;
        }else{
        new_location = new_location + x;
        }
        window.location=new_location;
        update_top();
        removeHash();
}



// Showing and hiding plot areas and other elements
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.4;
    }, 50);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}



function turn_off_coverage(){
    
    show_coverage = false;
    fade(document.getElementById('plot_area_coverage'));
    document.getElementById('button_coverage').style.display = "inline";
    
    document.getElementById('title_coverage').classList.add('no-print');  
}


function turn_on_coverage(){
    
    unfade(document.getElementById('plot_area_coverage'));
    document.getElementById('button_coverage').style.display = "none";
    
    document.getElementById('title_coverage').classList.remove('no-print');   
    
    show_coverage = true;
    
    update_menu();
}




function turn_off_ratio(){

    fade(document.getElementById('plot_area_ratio'));
    document.getElementById('button_ratio').style.display = "inline";
    
    document.getElementById('button_toggle_filter_on').style.display  = "none";
    document.getElementById('button_toggle_filter_off').style.display = "none";
    document.getElementById('button_toggle_print').style.display      = "none";
    
    
    document.getElementById('title_ratio').classList.add('no-print');   
    
    show_ratio = false;
}



function turn_on_ratio(){
    
    show_ratio = true;
    unfade(document.getElementById('plot_area_ratio'));
    document.getElementById('button_ratio').style.display = "none";
        
    document.getElementById('button_toggle_filter_on').style.display  = "inline";
    document.getElementById('button_toggle_filter_off').style.display = "inline";
    
    if(!isChrome){
    document.getElementById('button_toggle_print').style.display      = "inline";
    }
    
    document.getElementById('title_ratio').classList.remove('no-print');   
    
    update_menu();
}



function turn_off_quality(){
    fade(document.getElementById('plot_area_quality'));
    document.getElementById('button_quality').style.display = "inline";    
    document.getElementById('title_quality').classList.add('no-print');   
    show_quality = false;
}

function turn_on_quality(){
    show_quality = true;
    unfade(document.getElementById('plot_area_quality'));
    document.getElementById('button_quality').style.display = "none";      
    document.getElementById('title_quality').classList.remove('no-print');   
    update_menu();
}

//     function toggel_coverage(){
//         show_coverage = !show_coverage;
//     
//         if(show_coverage){
//         unfade(document.getElementById('plot_area_coverage'));
// 		//    document.getElementById('plot_area_coverage').style.display='block';
//         document.getElementById('button_coverage').innerHTML='Hide Plot';
//         }else{
//         fade(document.getElementById('plot_area_coverage'));
// 			//document.getElementById('plot_area_coverage').style.display='none';
//         document.getElementById('button_coverage').innerHTML='Show Plot';
//         }
// 
//     }
	
	
// 	function toggel_ratio(){
// 	show_ratio = !show_ratio;
//  
// 		if(show_ratio){
// 		//document.getElementById('plot_area_ratio').style.display='block';
// 		unfade(document.getElementById('plot_area_ratio'));
// 		document.getElementById('button_ratio').innerHTML='Hide Plot';
// 		}else{
// 		//document.getElementById('plot_area_ratio').style.display='none';
// 		fade(document.getElementById('plot_area_ratio'));
// 		document.getElementById('button_ratio').innerHTML='Show Plot';
// 		}
// 
// 	}
	
	
// 	function toggel_quality(){
// 	show_quality = !show_quality;
//  
// 		if(show_quality){
// 		//document.getElementById('plot_area_quality').style.display='block';
// 		unfade(document.getElementById('plot_area_quality'));
// 		document.getElementById('button_quality').innerHTML='Hide Plot';
// 		}else{
// 		//document.getElementById('plot_area_quality').style.display='none';
// 		fade(document.getElementById('plot_area_quality'));
// 		document.getElementById('button_quality').innerHTML='Show Plot';
// 		}
// 
// 	}	

	
function hide_plot(plot_id){
    
        switch (plot_id){
            case "plot_area_coverage":
                turn_off_coverage();
                break;
            case "plot_area_ratio":
                turn_off_ratio();
                break;
            case "plot_area_quality":
                turn_off_quality();
                break;
            default:
                console.error("No Plot with ID: \""+plot_id+"\"");
                break;
        }
    
    update_menu();
}
	
// 	Rerange x axes
function apply_range_coverage()
{
    console.log(layout_coverage.xaxis);
    
    var range_c = layout_coverage.xaxis.range.slice(0);
    
    layout_ratio.xaxis.autorange = false; 
    layout_ratio.xaxis.range = range_c.slice(0);
    layout_quality.xaxis.autorange = false; 
    layout_quality.xaxis.range = range_c.slice(0);
    
    Plotly.redraw(document.getElementById('plot_area_ratio'), layout_ratio);
    Plotly.redraw(document.getElementById('plot_area_quality'), layout_quality);
}
	
function apply_range_ratio()
{
    console.log(layout_ratio.xaxis);
    
    var range_r = layout_ratio.xaxis.range.slice(0);
    
    layout_coverage.xaxis.autorange = false; 
    layout_coverage.xaxis.range = range_r.slice(0);
    
    layout_quality.xaxis.autorange = false; 
    layout_quality.xaxis.range = range_r.slice(0);
    
    
    Plotly.redraw(document.getElementById('plot_area_coverage'), layout_coverage);
    Plotly.redraw(document.getElementById('plot_area_quality'), layout_quality);
}


	

function apply_range_quality()
{
    console.log(layout_quality.xaxis);
    
    var range_q = layout_quality.xaxis.range.slice(0);
    
    layout_coverage.xaxis.autorange = false; 
    layout_coverage.xaxis.range = range_q.slice(0);
    
    layout_ratio.xaxis.autorange = false; 
    layout_ratio.xaxis.range = range_q.slice(0);
    
    
    Plotly.redraw(document.getElementById('plot_area_coverage'), layout_coverage);
    Plotly.redraw(document.getElementById('plot_area_ratio'), layout_ratio);
    
}

	
function rerange_plots(plot_id){
            
        switch (plot_id){
            case "plot_area_coverage":
                apply_range_coverage();
                redo_quality();
                break;
            case "plot_area_ratio":
                apply_range_ratio();
                redo_quality();
                break;
            case "plot_area_quality":
                apply_range_quality();
                break;
            default:
                console.error("No Plot with ID: \""+plot_id+"\"");
                break;
        }  
            
}
        
        
        
        
        
        
        
function get_consensus_for_range(left, right){
    
            console.log(left+" "+right);
            
                var result = "";
                
                if(current_view == "plot_area_ratio" && filtered_ratio)
                {
                    for(var i = left; i<= right; i++){
                    result = result + consensus_filtered[i];    
                    }
                }else{
                    for(var i = left; i<= right; i++){
                    result = result + majorsequence[i];    
                    }
                }
                
            return result;    
}
        
        
function update_menu_width(){
  
    var el_leftmost = document.getElementById('menu_divider');

    
    var rect = el_leftmost.getBoundingClientRect();
    
    var left_offset = rect.left;
    
    if(left_offset > window.innerWidth){
    return;
    }
    
    var el_right = document.getElementById('right_menu');
    rect = el_right.getBoundingClientRect();
     right_offset = (rect.right - rect.left);
     
     var space = Math.max( (window.innerWidth - right_offset - left_offset - 49), 0 );
     
      el_leftmost.style.width = space+"px";   
    
}
        
        
function update_consensus_position(){
    var top = 0;
    if(single_point_shown){
        top = document.getElementById('data_point_box').getBoundingClientRect().bottom;
    }else{
     top =   document.getElementById('top_menu').getBoundingClientRect().bottom; 
    }
            document.getElementById('sequence_box').style.top = (top + 10)+"px"; 
}
        
        
function update_consensus_width(){
    
    update_consensus_position();
    
    if(!consensus_shown)
    {
    return;    
    }
    
    var el_field = document.getElementById('consensus_sequence_field');

    
    var rect = el_field.getBoundingClientRect();
    
    var el_select_button = document.getElementById('select_sequence_button');
  
    var select_button_width = el_select_button.getBoundingClientRect().right - el_select_button.getBoundingClientRect().left;
    
    var width = (window.innerWidth - rect.left -49);
    width -= document.getElementById('select_sequence_button').offsetWidth;
    
    console.log(document.getElementById('select_sequence_button').offsetWidth+" vs. "+select_button_width);
    
    el_field.style.width = 'auto';
    
    console.log(width+" Auto: "+el_field.offsetWidth);
    
    if(width > el_field.offsetWidth){
    el_field.style.width = width+"px";
    }
    
}



function show_consensus_sequence(plot_id){
    
    var range;
    var result = "";
    
            switch (plot_id){
            case "plot_area_coverage":
                range = layout_coverage.xaxis.range.slice(0);
                break;
            case "plot_area_ratio":
                range = layout_ratio.xaxis.range.slice(0);
                break;
            case "plot_area_quality":
                range = layout_quality.xaxis.range.slice(0);
                break;
            default:
                console.error("No Plot with ID: \""+plot_id+"\"");
                break;
        }  

        range[0] = Math.max(Math.ceil(range[0]),0);
        range[1] = Math.min(Math.floor(range[1]),number_of_values-1);
        

        
    result = get_consensus_for_range(range[0], range[1]);
    
    console.log(result);
    
    var el_field = document.getElementById('consensus_sequence_field');
//     document.getElementById('consensus_sequence_field').value = result;
    el_field.value = result;
    
    el_field.style.width = 'auto'; 
    
    document.getElementById('sequence_box').style.display = 'block';
    consensus_shown = true;
    
   update_consensus_width();

   
}
	
// Manipulations for the ratio plot	
// 	function toggle_plot_filter(){
// 	    filtered_ratio = !filtered_ratio;
//         Plotly.purge(document.getElementById('plot_area_ratio'));
//         document.getElementById("button_toggle_filter_off").disabled    = false;
//         document.getElementById("button_toggle_filter_on").disabled     = false;
//         if(filtered_ratio)
//         {
//         Plotly.plot(document.getElementById('plot_area_ratio'), [trace_ratio_A_filtered], layout_ratio, defaultPlotlyConfiguration);
//         Plotly.plot(document.getElementById('plot_area_ratio'), [trace_ratio_C_filtered], layout_ratio, defaultPlotlyConfiguration);
//         Plotly.plot(document.getElementById('plot_area_ratio'), [trace_ratio_G_filtered], layout_ratio, defaultPlotlyConfiguration);
//         Plotly.plot(document.getElementById('plot_area_ratio'), [trace_ratio_T_filtered], layout_ratio, defaultPlotlyConfiguration);
//         document.getElementById("button_toggle_filter_on").disabled     = true;
//         }else{
//         Plotly.plot(document.getElementById('plot_area_ratio'), [trace_ratio_A], layout_ratio, defaultPlotlyConfiguration);
//         Plotly.plot(document.getElementById('plot_area_ratio'), [trace_ratio_C], layout_ratio, defaultPlotlyConfiguration);
//         Plotly.plot(document.getElementById('plot_area_ratio'), [trace_ratio_G], layout_ratio, defaultPlotlyConfiguration);
//         Plotly.plot(document.getElementById('plot_area_ratio'), [trace_ratio_T], layout_ratio, defaultPlotlyConfiguration);
//         document.getElementById("button_toggle_filter_off").disabled    = true;
//         }
//     }


function smooth_ratio_plot(num_sites){
   
    var A,C,G,T;
    var trace_A,
        trace_C,
        trace_G,
        trace_T;
        
    if(!filtered_ratio){
    A = relative_plot_A.slice();
    C = relative_plot_C.slice();
    G = relative_plot_G.slice();
    T = relative_plot_T.slice();
    
    
    trace_A = clone_trace(trace_ratio_A);
    trace_C = trace_ratio_C;
    trace_G = trace_ratio_G;
    trace_T = trace_ratio_T;
    
    }else{
    A = relative_plot_C_filtered.slice();
    C = relative_plot_G_filtered.slice();
    G = relative_plot_A_filtered.slice();
    T = relative_plot_T_filtered.slice(); 
    
    trace_A = clone_trace(trace_ratio_A_filtered);    
    trace_C = trace_ratio_C_filtered;
    trace_G = trace_ratio_G_filtered;
    trace_T = trace_ratio_T_filtered;
    }
    

    
    var length = A.length;
    
    for(var i = 0; i < length; i++){
        
            var sum = 0;
            var count = 0;
     for(var j = i-Math.floor(num_sites/2); j <= i + Math.floor(num_sites/2); j++){
     if(j<0){
      continue;   
     }
     if(j>length-1){
       break;
     }
     
         count++;
            if(isNumber(trace_A.y[i])){
            sum += trace_A.y[i];
            }
            if(isNumber(trace_C.y[i])){
            sum += trace_C.y[i];
            }
            if(isNumber(trace_G.y[i])){
            sum += trace_G.y[i];
            }
            if(isNumber(trace_T.y[i])){
            sum += trace_T.y[i];
            }
     }
     
     if(count == 0){
      console.log("ERROR: Fount no element to sum over");   
     
    }
     
     if(sum > 0){
     A[i] = sum/count;
     }
        
    }
    
    console.log(trace_A.y[16000]);
    console.log(A[16000]);
    trace_A.y = A;
    trace_C.y = C;
    trace_G.y = G;
    trace_T.y = T;
    
    Plotly.deleteTraces(document.getElementById('plot_area_ratio'), [0, 1, 2, 3]);
    
    Plotly.addTraces(document.getElementById('plot_area_ratio'), [trace_A, trace_C, trace_G, trace_T]);
}

function toggle_plot_filter(){
	
        filtered_ratio = !filtered_ratio;
        
        document.getElementById("button_toggle_filter_off").disabled    = false;
        document.getElementById("button_toggle_filter_on").disabled     = false;
        
        
        Plotly.deleteTraces(document.getElementById('plot_area_ratio'), [0, 1, 2, 3]);
        
            if(filtered_ratio)
            {
            Plotly.addTraces(document.getElementById('plot_area_ratio'), [trace_ratio_A_filtered, trace_ratio_C_filtered, trace_ratio_G_filtered, trace_ratio_T_filtered]);
            
            document.getElementById("button_toggle_filter_on").disabled     = true;
            }else{
            Plotly.addTraces(document.getElementById('plot_area_ratio'), [trace_ratio_A, trace_ratio_C, trace_ratio_G, trace_ratio_T]);
            
            document.getElementById("button_toggle_filter_off").disabled    = true;
            }
        
}
	
    function toggle_ratio_print(){
        print_ratio = !print_ratio;
        
        Plotly.deleteTraces(document.getElementById('plot_area_ratio'), [0, 1, 2, 3]);
        
        if(!print_ratio)
        {
        trace_ratio_A.type='scattergl';
        trace_ratio_C.type='scattergl';
        trace_ratio_G.type='scattergl';
        trace_ratio_T.type='scattergl';
        
        trace_ratio_A_filtered.type='scattergl';
        trace_ratio_C_filtered.type='scattergl';
        trace_ratio_G_filtered.type='scattergl';
        trace_ratio_T_filtered.type='scattergl';
        document.getElementById('button_toggle_print').innerHTML='Print Version [<font color="red">Off</font>]';
        }else{
        trace_ratio_A.type='scatter';
        trace_ratio_C.type='scatter';
        trace_ratio_G.type='scatter';
        trace_ratio_T.type='scatter';
        
        trace_ratio_A_filtered.type='scatter';
        trace_ratio_C_filtered.type='scatter';
        trace_ratio_G_filtered.type='scatter';
        trace_ratio_T_filtered.type='scatter';
        document.getElementById('button_toggle_print').innerHTML='Print Version [<font color="green">On</font>]';
        }
        
        if(filtered_ratio){
        Plotly.addTraces(document.getElementById('plot_area_ratio'), [trace_ratio_A_filtered, trace_ratio_C_filtered, trace_ratio_G_filtered, trace_ratio_T_filtered]);
        }else{
        Plotly.addTraces(document.getElementById('plot_area_ratio'), [trace_ratio_A, trace_ratio_C, trace_ratio_G, trace_ratio_T]);    
        }
    }
	
	
	
	
	
	
	
function get_trace_quality(left, right){
    l = Math.floor(left);
    r = Math.ceil(right);
    
//     var range = [left, right];
    var number_of_values_quality = r - l;
    var yValues = [];
    var box_numbers = 20;
    console.log(l+" "+r+" "+number_of_values_quality);
//     extern data;
    data = [];
    var every = Math.floor(number_of_values_quality/box_numbers);
    if(every < 1){ every = 1;}
    
    var stop = false;
//         for( var i = left; i <= left + number_of_values_quality;  i+=every ){
        for( var i = l; !stop ;  i+=every ){
//                 if(i > l + number_of_values_quality - 2){
                if(i > r){
                    stop = true;   
                }
            
            var min_q = min[i];
            var max_q = max[i];
            var sum_coverage_q = 0;
            
            var avg_median  = 0,
                avg_Q1      = 0,
                avg_Q3      = 0;
                
            for(var j = 0; j<every && (i+j) <= r; j++)
            {
                min_q = Math.min(min_q, min[i+j]);
                max_q = Math.max(max_q, max[i+j]);
                sum_coverage_q += coverage[i+j];
                
                avg_median  += Median[i+j]*coverage[i+j];
                avg_Q1      += Q1[i+j]*coverage[i+j];
                avg_Q3      += Q3[i+j]*coverage[i+j];
            }
            



            
 


            
    var ySingleArray = [];
    
    if(sum_coverage_q>0)
    {
    avg_median  = avg_median/sum_coverage_q;    
    avg_Q1      = avg_Q1    /sum_coverage_q;      
    avg_Q3      = avg_Q3    /sum_coverage_q;      
       
    ySingleArray.push(min_q);
    ySingleArray.push(avg_Q1);
    ySingleArray.push(avg_median);
    ySingleArray.push(avg_Q3);
    ySingleArray.push(max_q);
    }else{
    ySingleArray.push(undefined);
    }
    yValues.push(ySingleArray);
    }
    
        for( var i = 0; i < yValues.length;  i++ ){
    var result = {
    y: yValues[i],
    type:'box',
    name: l+(i*every+Math.floor(every/2.0)),
    boxpoints: false,
        marker:{
        color: 'orange'
        },
//       text: 'Click to open data-file'
                  text: 'Click to inspect central point'
    };
    
//     console.log(result);
    
    data.push(result);
    }
}
	
	
	
	
function redo_quality(){
//     update_menu_specific('plot_area_quality');
           
    get_trace_quality(layout_quality.xaxis.range[0], layout_quality.xaxis.range[1]);
           
    console.log(data.length);

        Plotly.newPlot('plot_area_quality', data, layout_quality, defaultPlotlyConfiguration);
        
        document.getElementById('plot_area_quality')._fullLayout.xaxis._rangeInitial = [initial_quality_range_x[0],initial_quality_range_x[1]];
        document.getElementById('plot_area_quality')._fullLayout.yaxis._rangeInitial = [initial_quality_range_y[0],initial_quality_range_y[1]];
        
            document.getElementById('plot_area_quality').on('plotly_click', function (eventdata){
            console.log("x:"+eventdata.points[0].x+" y:"+eventdata.points[0].y);   
//             goto_data_i(eventdata.points[0].x);
            handle_plotly_click(eventdata.points[0].x);
            });
                    
            document.getElementById('plot_area_quality').on('plotly_relayout', function (eventdata){
            redo_quality();
            });
}	

	
	
function get_dist_to_adjusted_center(el){
//     return el.getBoundingClientRect().top + window.innerHeight*0.5;    
    return el.getBoundingClientRect().top + el.offsetHeight*0.5;    
}


function get_closest_plot(pos){
 
    var result = "plot_area_coverage";
    
	var elements = [];
	
		if(show_coverage)
	{
	elements.push("plot_area_coverage");
	}
	
	if(show_ratio)
	{
	elements.push("plot_area_ratio");
	}
	
	if(show_quality)
	{
	elements.push("plot_area_quality");
	}
	
	//If there is no non-hidden element, simply return the first, in this case "plot_area_coverage"	
	var length = elements.length;
	if(length == 0)
	{
	return result;
	}
	
	var min = Math.abs(get_dist_to_adjusted_center(document.getElementById(elements[0])) - pos);
    result = elements[0];
	
	var value;
		for(var i = 1; i < length; i++){
		value = Math.abs(get_dist_to_adjusted_center(document.getElementById(elements[i])) - pos);
			if(min > value)
			{
			min = value;
			result = elements[i];
			}
		}
    
    return result;
}



function get_title(plot_id){
    switch (plot_id){
        case "plot_area_coverage":
            return "Coverage: ";
        case "plot_area_ratio":
            return "Majorbase Ratio: ";
        case "plot_area_quality":
            return "Quality Profile: ";
        case "":
        case ":":    
            return false;    
        default:
            console.error("No Plot with ID: \""+plot_id+"\"");
            return false;
        
    }
}

function update_menu_specific(plot_id){
    
  if(plot_id != current_view)
  {
  if(get_title(current_view))
  {
  document.getElementById(current_view).classList.remove('active_view');
  }
  document.getElementById(plot_id).classList.add('active_view');
  
  console.log("changing to: "+plot_id);
  document.getElementById('display_current_view_name').innerHTML = get_title(plot_id);
  current_view = plot_id;
  }
    
    update_menu_width();
}

function update_menu() {
//Calculate relative position in window top<this<=window.innerHeight
    var a = window.innerHeight;
    var b = document.getElementById('bottom_element').getBoundingClientRect().bottom;
    var c = document.getElementById('top_element').offsetTop+document.getElementById('top_element').offsetHeight;
    var max = document.getElementById('bottom_element').offsetTop+document.getElementById('bottom_element').offsetHeight;
    
//  pos denotes the relative position in the screen. if we scroll to the bottom, the bottom line is evaluated. On top the top element.
    var pos;
    if(a < max){
       pos = ((a/b-a/max)*(1-c/a)/(1-a/max)+c/a)*a;
    }else{
        pos = 0.5*a;
    }

  var plot_name = get_closest_plot(pos);
  
  update_menu_specific(plot_name);

}





function process_data()
{
var num_sites = As.length;

relative_A = As.slice(0);
relative_C = Cs.slice(0);
relative_G = Gs.slice(0);
relative_T = Ts.slice(0);


for(var i=0; i< num_sites;i++)
{
relative_A[i] = As[i]/(As[i]+Cs[i]+Gs[i]+Ts[i]);
relative_C[i] = Cs[i]/(As[i]+Cs[i]+Gs[i]+Ts[i]);
relative_G[i] = Gs[i]/(As[i]+Cs[i]+Gs[i]+Ts[i]);
relative_T[i] = Ts[i]/(As[i]+Cs[i]+Gs[i]+Ts[i]);
}

relative_plot_A = relative_A.slice(0);
relative_plot_C = relative_C.slice(0);
relative_plot_G = relative_G.slice(0);
relative_plot_T = relative_T.slice(0);



for(var i=0; i< num_sites;i++)
{
if(majorsequence[i] != "A")
{
 relative_plot_A[i] = undefined;
}
if(majorsequence[i]!=='C')
{
relative_plot_C[i] = undefined;
}
if(majorsequence[i]!=='G')
{
relative_plot_G[i] = undefined;
}
if(majorsequence[i]!=='T')
{
relative_plot_T[i] = undefined;
}
}

relative_plot_A_filtered = relative_plot_A.slice(0);
relative_plot_C_filtered = relative_plot_C.slice(0);
relative_plot_G_filtered = relative_plot_G.slice(0);
relative_plot_T_filtered = relative_plot_T.slice(0);

var sum_coverage = 0;
var num_coverage = 0;
for(var i=0; i< num_sites;i++)
{
    if(coverage[i] > 0)
    {
    sum_coverage += coverage[i];
    num_coverage++;
    }
}
var average_coverage = sum_coverage/num_coverage;
console.log("Average Coverage for covered sites: "+average_coverage);

var threshold_for_coverage = average_coverage*0.01;
for(var i=0; i< num_sites;i++)
{
if(coverage[i] < threshold_for_coverage)
{
relative_plot_A_filtered[i] = undefined;
relative_plot_C_filtered[i] = undefined;
relative_plot_G_filtered[i] = undefined;
relative_plot_T_filtered[i] = undefined;
}
}


consensus_filtered = majorsequence.slice(0);

    for(var i=0; i< num_sites;i++)
    {
        if(coverage[i] < threshold_for_coverage)
        {
            consensus_filtered[i] = "N";
            if(coverage[i] == 0)
            {
            majorsequence[i] = "N";    
            }
        }
    }

}











// ------------------------------------
// -------------list.html--------------
// ------------------------------------


function set_header_dimensions(){
    
    var tr_src = document.getElementById("table_header_original");
    var th_src = tr_src.getElementsByTagName("th");
    
    var tr_trgt = document.getElementById("table_header");
    var th_trgt = tr_trgt.getElementsByTagName("th");
    
//     console.log(th_src);
//     console.log(th_trgt);
    
    for ( var i = 0; i < th_src.length; i++ ) {
        
        

        
        th_trgt[i].colSpan      = th_src[i].colSpan;
        th_trgt[i].rowSpan      = th_src[i].rowSpan;
        th_trgt[i].style.width  = th_src[i].offsetWidth+"px";
        th_trgt[i].style.minWidth  = th_src[i].offsetWidth+"px";
        th_trgt[i].style.maxWidth  = th_src[i].offsetWidth+"px";
        th_trgt[i].width        = th_src[i].width+"px";
        
        var p = th_trgt[i].offsetWidth - th_src[i].offsetWidth;
        
        th_trgt[i].style.width  = th_src[i].offsetWidth - p + "px";
        th_trgt[i].style.minWidth  = th_src[i].offsetWidth - p +"px";
        th_trgt[i].style.maxWidth  = th_src[i].offsetWidth - p +"px";
        
//          console.log(th_src[i].offsetWidth+" vs. "+th_trgt[i].offsetWidth);
    }
    
}


function scroll_header_y(){
var el_original = document.getElementById('table_header_original_table');
var left = el_original.getBoundingClientRect().left;

var el_new = document.getElementById('table_header_table');
el_new.style.left = left+"px";

var left_new = el_new.getBoundingClientRect().left;


// var p = left_new - left;

// el_new.style.left = left + p;

}

function update_top(){

var el  = document.getElementById('table_header_table'); 
var bottom = el.getBoundingClientRect().bottom;

console.log(bottom);

// Delay added for google Chrome
setTimeout(function() {window.scrollBy(0, -1*bottom);},1);
// /*window.scrollBy(0, -1*bottom)*/;
}


function set_header_visibility(){
    document.getElementById('table_header_table').style.display="block";
}


// function set_table_visibility(){
//     var elements = document.getElementsByTagName('td');
//     for(var i=0; i<elements.length; i++){
//         elements[i].style.display="inline";
//     }
//     
// }



//From https://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-url-with-javascript-without-page-r/5298684#5298684
function removeHash () { 
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history)
        history.pushState("", document.title, loc.pathname + loc.search);
    else {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = "";

        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
}

