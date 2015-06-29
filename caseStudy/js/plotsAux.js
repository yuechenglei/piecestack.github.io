function drawAggregation(t,e){var n=3.5,r=t.stackedDataArr[e],o=r.xScale,a=r.yScale,i=t.svg,l=t.totalContri,s=t.xTickFormat,c=!1,u=[],d=d3.svg.line().x(function(t){return o(t.x)}).y(function(t){return a(t.y)}).interpolate(interpolate).tension(tension),y=(d3.merge(t.stackedDataArr.map(function(t){return t.curTotalContri})),contributeScale(l,"contribution",[greenColor,grayColor,redColor],0),contributeScale(r.curTotalContri,"contribution",[greenColor,grayColor,redColor],0)),p=contributeScale(r.curTotalContri,"dy",[20,0,-20],0);d3.selectAll(".AggregationDiff"+e).remove(),i.selectAll(".AggregationDiff"+e).data(r.curTotalContri).enter().append("line").attr("class","Aggregation AggregationDiff AggregationDiff"+e+" graph"+e).attr("x1",function(t){return o(t.x)}).attr("y1",function(t){return a(t.y)}).attr("x2",function(t){return o(t.x)}).attr("y2",function(t){return a(t.y)+p(t.dy)}),d3.selectAll(".AggregationLine"+e).empty()&&i.selectAll(".AggregationLine"+e).data([l]).enter().append("path").attr("class","Aggregation AggregationLine AggregationLine"+e+" graph"+e).attr("d",function(t){return d(t)}),i.selectAll(".AggregationPoint"+e).remove();var g=d3.select(".toolTip"+e);i.selectAll(".AggregationPoint"+e).data(r.curTotalContri).enter().append("circle").attr("class",function(t){return"Aggregation AggregationPoint AggregationPoint"+e+" AggregationPoint"+e+"-time-"+t.x+" graph"+e}).attr("cx",function(t){return o(t.x)}).attr("cy",function(t){return a(t.y)+p(t.dy)}).style("fill",function(t){return y(t.contribution)}).attr("r",n).on("click",function(n){var r=!1;d3.event.shiftKey&&(r=!0),c?(i.selectAll(".NMIline").remove(),u.push(n.x),clearTimeout(c),c=!1,u.length>1&&plotSankey(t,u,e),u=[]):c=setTimeout(function(){d3.selectAll(".partialStack").classed("unselected",!1),d3.selectAll(".clusterNode").remove(),d3.selectAll(".sankeyLink").remove(),i.selectAll(".NMIline").remove(),u=[n.x],drawNMI(t,n,e,l),c=!1},interactDuration)}).on("mouseover",function(t){g.transition().duration(200).style("opacity",toolTipOp),g.html("<b>contribution</b> &emsp;"+t.contribution.toFixed(3)+"<br/><b>date</b> &emsp;"+s(t.x)+"<br/><b>sum</b> &emsp;"+t.y.toFixed(2)).style("left",d3.event.pageX+5+"px").style("top",d3.event.pageY+10+"px").style("text-align","left").style("font-weight",500)}).on("mouseout",function(){g.transition().duration(500).style("opacity",0)})}function drawNMI(t,e,n,r){var o=t.stackedDataArr[n],a=o.xScale,i=o.yScale,l=t.svg,s=(l.selectAll(".partialStack"+n),t.xTickFormat),c=o.stackedData,u=c.map(function(t){return t.xRange[0]}),d=r.filter(function(t){return-1!=u.indexOf(t.x)}),y=d.map(function(t){var n=[{x:t.x,y:t.y},{x:e.x,y:e.y}];return t.x>e.x&&(n=[{x:e.x,y:e.y},{x:t.x,y:t.y}]),{axis:n,NMI:nmi(c,[e.x,t.x]),selectedTime:[e.x,t.x]}}).filter(function(t){return-1!=t.NMI}),p=d3.scale.linear().domain([0,.5,1]).range(["#1A693B","#D3D3D3","#91003F"]);l.selectAll(".NMIline").remove();var g=d3.select(".toolTip"+n);l.selectAll(".NMIline"+n).data(y).enter().append("path").attr("class",function(){return"NMIline NMIline-"+n+" NMIline-"+n+"-time-"+e.x+" graph"+n}).attr("d",function(t){var e=a(t.axis[1].x)-a(t.axis[0].x),n=i(t.axis[1].y)-i(t.axis[0].y),r=Math.sqrt(e*e+n*n);return"M"+a(t.axis[0].x)+","+i(t.axis[0].y)+"A"+r+","+r+" 0 0,1 "+a(t.axis[1].x)+","+i(t.axis[1].y)}).attr("stroke",function(t){return p(t.NMI)}).attr("display",function(t){return Math.abs(t.NMI-.5)>nmiThreshold?!0:"none"}).on("mouseover",function(t){d3.select(this).style("stroke-width",5),g.transition().duration(200).style("opacity",toolTipOp),g.html("<b>NMI</b> &emsp;"+t.NMI.toFixed(3)+"<br/><b>date1</b> &emsp;"+s(t.axis[0].x)+"<br/><b>date2</b> &emsp;"+s(t.axis[1].x)).style("left",d3.event.pageX+5+"px").style("top",d3.event.pageY+10+"px").style("text-align","left").style("font-weight",500)}).on("mouseout",function(){d3.select(this).style("stroke-width",1),g.transition().duration(500).style("opacity",0)}).on("click",function(){l.selectAll(".NMIline").remove()})}function plotGlyphContri(t,e,n){var r=t.stackedDataArr[n],o=r.xScale,a=r.yScale,i=t.svg,l=r.stackedData,s=t.xTickFormat,c=computeClusterContribute(l),u=contributeScale(c,"contribution",[greenColor,grayColor,redColor],0),d=d3.svg.symbol().type("diamond").size(40);i.selectAll(".contriGlyph"+n).remove();var y=d3.select(".toolTip"+n);i.selectAll(".contriGlyph"+n).data(c).enter().append("path").attr("class",function(t){return"contriGlyph contriGlyph"+n+" contriGlyph-cluster-"+t.clusterId+" contriGlyph-cluster-"+t.clusterId+"-time-"+t.axis.x+" contriGlyph-time-"+t.axis.x+" graph"+n}).attr("transform",function(t){return"translate("+o(t.axis.x)+","+a(t.axis.y)+")"}).attr("d",d).attr("fill",function(t){return u(t.contribution)}).attr("opacity",function(t){Math.abs(t.contribution)<e&&d3.select(this).classed("glyphHide",!0)}).on("mouseover",function(t){y.transition().duration(200).style("opacity",toolTipOp),y.html("<b>Contribution</b> &emsp;"+t.contribution.toFixed(3)+"<br/><b>date</b> &emsp;"+s(t.axis.x)).style("left",d3.event.pageX+5+"px").style("top",d3.event.pageY+10+"px").style("text-align","left").style("font-weight",500)}).on("mouseout",function(){y.transition().duration(500).style("opacity",0)}).on("mousemove",function(e){brushNoticeLine(o(e.axis.x),t)}),curHideGlyph=d3.selectAll(".glyphHide")}function plotPerSankeyLink(t,e,n){function r(t,e){var n=t[0],r={x:t[1].x,y:t[1].y,source:t[1].target,target:t[1].source},o=e(n),a=e(r).replace(/^M/,"L"),i=o+a+"Z";return i}d3.selectAll(".partialStack"+n).classed("unselected",!0);var o=t.stackedDataArr[n],a=o.xScale,i=o.yScale,l=t.svg,s=d3.behavior.drag().on("drag",function(e){t.curDrag=!0,e.drag.x+=d3.event.dx,e.drag.y+=d3.event.dy;var r=e.intersect;r.forEach(function(t){dragmove(t,n,e.drag)}),d3.event.sourceEvent.stopPropagation()}).on("dragend",function(e){t.curDrag=!1,e.drag.y&&t.toIndex>-2?(d3.selectAll(".sankeyLink"+n).remove(),d3.selectAll(".clusterNode"+n).remove(),e.drag.x=0,e.drag.y=0,decompositionFunc(e,"intersection",t,n)):e.drag.y&&(e.drag.x=0,e.drag.y=0,plotPartialStack(t,!0,n)),t.toIndex=-2}),c=d3.svg.diagonal().source(function(t){return{y:a(t.source.x)+t.source.nodeTrans,x:i(t.source.y)}}).target(function(t){return{y:a(t.target.x)+t.target.nodeTrans,x:i(t.target.y)}}).projection(function(t){return[t.y,t.x]});l.selectAll(".sankeyLink"+n).remove();var u=d3.select(".toolTip"+n);l.selectAll(".sankeyLink"+n).data(e).enter().append("path").attr("class","sankeyLink").attr("class",function(){return"sankeyLink sankeyLink"+n+" graph"+n}).attr("d",function(t){return r(t.links,c)}).on("mouseout",function(){d3.select(this).classed("hover",!1)}).on("mouseover",function(e){d3.select(this).classed("hover",!0),deleteRow(),addRow(e.intersect,t),u.transition().duration(200).style("opacity",toolTipOp),u.html("<b>num. intersection</b> &emsp;"+e.intersect.length).style("left",d3.event.pageX+5+"px").style("top",d3.event.pageY+10+"px").style("text-align","left").style("font-weight",500)}).on("mouseout",function(){d3.select(this).classed("hover",!1),u.transition().duration(500).style("opacity",0)}).call(s)}function plotSankey(){}function plotGlyphPerLayer(t,e){var n=t.stackedDataArr[e],r=n.xScale,o=n.yScale,a=t.svg,i=n.stackedData,l=computeMaxContriLayer(i),s=contributeScale(l,"contribution",["#00bde5",grayColor,"#00bde5"],0),c=d3.svg.symbol().type("diamond").size(30);a.selectAll(".layerGlyph"+e).remove();var u=d3.select(".toolTip"+e);a.selectAll(".layerGlyph"+e).data(l).enter().append("path").attr("class",function(t){return"layerGlyph layerGlyph"+e+" layerGlyph"+e+" layerGlyph-layer-"+t.clusterId+" layerGlyph-layer-"+t.lineContent.slice(1)+" layerGlyph-layer-"+t.lineContent.slice(1)+"-time-"+t.axis.x+" layerGlyph-time-"+t.axis.x+" graph"+e}).attr("transform",function(t){return"translate("+r(t.axis.x)+","+o(t.axis.y)+")"}).attr("d",c).attr("fill",function(t){return s(t.contribution)}).on("mouseover",function(t){u.transition().duration(200).style("opacity",toolTipOp),u.html("<b>"+t.lineContent+"</b><br/><b>Contribution</b> &emsp;"+t.contribution.toFixed(3)).style("left",d3.event.pageX+5+"px").style("top",d3.event.pageY+10+"px").style("text-align","center").style("font-weight",500)}).on("mouseout",function(){u.transition().duration(500).style("opacity",0)}),curHideGlyph=d3.selectAll(".glyphHide")}