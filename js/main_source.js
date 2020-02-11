
var formSelected;
var initRank;
var arrayLimit;
var targetID;
var selectedGenres = [3];
var vnadsArray = new Array();
var selectedCTC = new Array();
var selectedCTCtext = new Array();
var musicTitle = new Array();
var musicComposer = new Array();
var musicDuration = new Array();
var musicBPM = new Array();
var musicDecade = new Array();
var musicYoutube = new Array();
var musicSpotify = new Array();
var resultsFinished = false;
var currentAssessmentPane = '#VNADSpane';

$(document).ready(function(){
    localStorage.clear();

    $.ajax({
        method: "GET",
        url: "../php/counter.php",
        dataType: "json"
      });

    $(".dp").datepicker({ 
        changeMonth: true,
        changeYear: true,
        format: 'dd/mm/yyyy',
    });
    $(".reset").click(function(e){
        e.preventDefault();
        location.reload();
    });
    $("#app4Link").click(function(e){
        $('#resultsPage').removeClass('show active');
        $('#appendix4').addClass('show active');
        $('#app4Tab').addClass('active');
        $('#resTab').removeClass('active');
    });
    $('select[name="rankings"]').change(function(){
        initRank = $(this).val();
        selectedGenres[$(this).prop('id')] = initRank;
        $('select[name="rankings"]').each(function(i,e){
            $('select#' + i).each(function(){
                for(z = 0; z < selectedGenres.length; z ++){
                    $('select#' + i).find($('[value="'+selectedGenres[z] +'"]')).prop('disabled',true);
                };
            })
            $(e).children().each(function(){
                for(z = 0; z < selectedGenres.length; z ++){
                    if(($(this).val() != "") && (!(selectedGenres.includes($(this).val()))))
                        $(this).prop('disabled',false);
                };
            });
        });
    });
    if(($('.active .tab-pane').has('#app1Ppane'))){
        formSelected = "f1";
        console.log("Active\t"+formSelected);
        disableFields();
        loadPatientMusicPrefQs();
    }
    if(($('.active .tab-pane').has('#VNADSpane'))){
        formSelected = "VNADSpform";
        console.log("Active\t"+formSelected);
        loadPatientVNADS();
    }
    if(($('.active .tab-pane').has('#appendix2'))){
        console.log('appendix2');
        $('#ctcResultTable').hide();
    }
    $('#app1Ptab').on('shown.bs.tab',function(event){
        formSelected = "f1";
        console.log("shown\t"+formSelected);
        disableFields();
        loadPatientMusicPrefQs();
    })
    $('#app1Ctab').on('shown.bs.tab',function(event){
        formSelected = "f2";
        console.log("shown\t"+formSelected);
        disableFields();
        loadCaregiverMusicPrefQs();
    })
    $('#VNADSptab').on('shown.bs.tab',function(event){
        formSelected = "VNADSpform";
        console.log("shown\t"+formSelected);
        loadPatientVNADS();
        disableVNADSradios();
    })
    $('#VNADSctab').on('shown.bs.tab',function(event){
        formSelected = "VNADScform";
        console.log("shown\t"+formSelected);
        loadCaregiverVNADS();
        disableVNADSradios();
    });
    $('#appendix2').on('shown.bs.tab',function(event){
        $('#ctcResultTable').hide();
        $('#ctcResultTable tbody tr').each(function(){
            $(this).removeClass('bg-warning bg-danger text-white');
        });
    });
    loadClassicalMusic();
    loadCountryMusic();
    loadFolkMusic();
    loadReligionMusic();
    loadJazzMusic();
    loadPopMusic();
});

$(".app1Link, .app2Link, .app3Link").click(function(e){
    $(this).parents("div").removeClass("show active");
    $(this).parents("div").removeAttr("style");
    $("#resTab").click();
});
$(".app4Link").click(function(e){
    $(this).parents("div").removeClass("show active");
    $(this).parents("div").removeAttr("style");
    $("#app4Tab").click();
});
$(".app5Link").click(function(e){
    $(this).parents("div").removeClass("show active");
    $(this).parents("div").removeAttr("style");
    $("#post1").click();
});
$(".app6Link").click(function(e){
    $(this).parents("div").removeClass("show active");
    $(this).parents("div").removeAttr("style");
    $("#post2").click();
});
$(".chapter1Link").click(function(e){
    $("#CTCprintable").removeClass("show active");
    $("#CTCprintable").removeAttr("style");
    $("#chapter1").click();
});
$(".chapter3Link").click(function(e){
    $("#CTCprintable").removeClass("show active");
    $("#CTCprintable").removeAttr("style");
    $("#chapter3").click();
});
$(".chapter4Link").click(function(e){
    $(this).parents("div").removeClass("show active");
    $(this).parents("div").removeAttr("style");
    $("#chapter4").click();
});
$(".chapter5Link").click(function(e){
    $(this).parents("div").removeClass("show active");
    $(this).parents("div").removeAttr("style");
    $("#chapter5").click();
});
$(".preAT").click(function(e){
    $("#guide").removeClass('show active');
    $("#guide").removeAttr('style');
    $('#resTab').click();
});
$('.ch1').click(function(e){
    $("#guide").removeClass('show active');
    $("#guide").removeAttr('style');
    $('#chapter1').click();
});
$('.ch2').click(function(e){
    $("#guide").removeClass('show active');
    $("#guide").removeAttr('style');
    $('#chapter2').click();
});
$('.ch3').click(function(e){
    $("#guide").removeClass('show active');
    $("#guide").removeAttr('style');
    $('#chapter3').click();
});
$('.ch4').click(function(e){
    $("#guide").removeClass('show active');
    $("#guide").removeAttr('style');
    $('#chapter4').click();
});
$('.ch5').click(function(e){
    $("#guide").removeClass('show active');
    $("#guide").removeAttr('style');
    $('#chapter5').click();
});
$('.musicList').click(function(e){
    $("#guide").removeClass('show active');
    $("#guide").removeAttr('style');
    $('#app4Tab').click();
});
$('.postAT1').click(function(e){
    $("#guide").removeClass('show active');
    $("#guide").removeAttr('style');
    $('#post1').click();
});
$('.postAT2').click(function(e){
    $("#guide").removeClass('show active');
    $("#guide").removeAttr('style');
    $('#post2').click();
});
$(".nav-tabs a").click(function(e){
    targetID = $(this).attr('href').toString();
    console.log("TARGET\t"+targetID);
    $('.tab-pane').not(targetID).each(function(e){
        $(this).removeClass('show active');
        $(this).removeAttr('style');
    });
    $(this).tab('show');
});
$('#resTab').click(function(event){
    console.log("resTab click");
    switch(currentAssessmentPane.toString()){
        case "#VNADSpane":
            $('#VNADSpane').addClass('show active');
            console.log(currentAssessmentPane.toString()+"\tTRIGGERED");
            console.log("CLASS\t"+$('#VNADSpane').attr('class'));
            break;
        case "#appendix2":
            $('#appendix1').removeClass('show active');
            $('#appendix1').removeAttr('style');
            $('#appendix2').addClass('show active');
            console.log(currentAssessmentPane.toString()+"\tTRIGGERED");
            break;
        case "#app1Ppane":
            $('#appendix1').removeClass('show active');
            $('#appendix1').removeAttr('style');
            $('#app1Ppane').addClass('show active');
            $('#appendix3').addClass('show active');
            console.log(currentAssessmentPane.toString()+"\tTRIGGERED");
            break;
        default:
            console.log('Results');
            $('#appendix1').removeClass('show active');
            $('#appendix1').removeAttr('style');
            $('#resultsPage').addClass('show active');
            break;
    }
});
$('#app2Button').click(function(event){
    $('#appendix2').removeClass('show active');
    $('#appendix1').addClass('show active');
    $('#VNADSpane').addClass('show active');
    currentAssessmentPane = "#VNADSpane";
});
$('#app3Button').click(function(event){
    $('#appendix3').removeClass('show active');
    $('#app1Ppane').removeClass('show active');
    $('#appendix2').addClass('show active');
    currentAssessmentPane = "#appendix2";
});
$('#vnadsGo').click(function(event){
    currentAssessmentPane = '#appendix2';
    console.log('CAP\t'+currentAssessmentPane);
    var itemsAboveNeutral = 0;
    localStorage.setItem("vnadsForm", formSelected);
    $('#vnadsForm :radio:checked').each(function(){
        var vnadsRating;
        switch(parseInt($(this).val())){
            case 0:
                vnadsRating = "Strongly Disagree";
                break;
            case 1:
                vnadsRating = "Disagree";
                break;
            case 2:
                vnadsRating = "Neither Agree nor Disagree";
                break;
            case 3:
            {
                vnadsRating = "Agree";
                itemsAboveNeutral++;
                break;
            }
            case 4:
            {
                vnadsRating = "Strongly Agree";
                itemsAboveNeutral++;
                break;
            }
        }
        localStorage.setItem($(this).prop('name'),vnadsRating);
        localStorage.setItem("itemsAboveNeutral",itemsAboveNeutral);
    })
    if($('#MMSEscore').val()){
        localStorage.setItem($('#MMSEscore').prop('id'),$('#MMSEscore').val())
    }else
        localStorage.setItem($(this).prop('id'),"N/A");
    $('#appendix1').removeClass('show active');
    $('#appendix2').addClass('show active');
})
$('#ctcGo').click(function(event){
    currentAssessmentPane = '#app1Ppane';            
    selectedCTC = [];
    selectedCTCtext = [];
    $('#ctcResultTable tbody tr td').each(function(){
        $(this).removeClass('bg-warning bg-danger text-white table-warning');
    })
    $('#ctcForm').find(':selected').each(function(){
        selectedCTC.push($(this).val());
        console.log('CTC val\t' + $(this).val());
        if(parseInt($(this).val()) > 0){
            console.log('CTC previous TD\t' + $(this).closest('td').prev('td').text());
            selectedCTCtext.push($(this).closest('td').prev('td').text());    
        }
    })
    $('#ctcResultTable tbody tr').each(function(i){
        switch(parseInt(selectedCTC[i])){
            case 1:{
                $(this).find('td').each(function(){
                    $(this).addClass('table-warning');
                });
                break;
            }
            case 2:{
                $(this).find('td').each(function(){
                    $(this).addClass('bg-warning');
                });
                break;
            }
            case 3:{
                $(this).find('td').each(function(){
                    $(this).addClass('text-white bg-danger');
                });
                break;
            }
            default:{
                break;
            }
        }
    });
    $('#appendix2').removeClass('show active');
    $('#appendix3').addClass('show active');
    $('#app1Ppane').addClass('show active');
});       
$("#prefsGo").click(function(event){
    currentAssessmentPane = '#resultsPage';           
    localStorage.setItem("formType", formSelected)
    $("#f1 textarea, #f1 text, #f1 .dp").each(function(){
        if($(this).val())
            localStorage.setItem($(this).prop('id'),$(this).val());
        else
            localStorage.setItem($(this).prop('id'),"N/A"); 
    }); 
    $("#f1").find(':selected').not('[value=""]').each(function(i,e){
        localStorage.setItem($(this).attr('name'),$(this).val());
    });
    $('#appendix3').removeClass('show active');
    $('#resultsPage').addClass('show active');
    getResults();
    resultsFinished = true;
});

function getResults(){
    getVNADS();
    getCTC();
    getPrefs();
    currentAssessmentPane = '#resultsPage';
}
function getPrefs(){
    var formType = localStorage.getItem("formType");
    formType === "f1" ? loadPatientQ() : loadCaregiverQ();
    var name = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
    var dob = localStorage.getItem("dob");
    console.log("dob\t" + dob);
    $("#name").text(name);
    $("#date").text(new Date().toLocaleDateString());
    $("#dobReturn").text(dob);
    $.each(localStorage, function(key, value){
        if($('#' + key + 'Return').length){
            $('#' + key + 'Return').text(value);
        }else if($('#' + key).length){
            if(key === "rank1"){
                $('#' + key).text('Rank 1: ' + value);
            }else if(key === "rank2"){
                $('#' + key).text('Rank 2: ' + value);
            }else if(key === "rank3"){
                $('#' + key).text('Rank 3: ' + value);
            }
        }
    });
}
function getVNADS(){
    localStorage.getItem("vnadsForm") === "VNADSpform" ? loadPatientVQ() : loadCaregiverVQ();
    var itemsAboveNeutral = parseInt(localStorage.getItem("itemsAboveNeutral"));
    var MMSEscore = parseInt(localStorage.getItem("MMSEscore"));
    var riskCategory = $('<div><strong></strong></div>');
    var highRiskOutput = $('<div></div>');
    var outputText, riskCheckMMSE, riskCheckVNADS, riskCheck;
    console.log("MMSEscore\t"+MMSEscore+"\titemsAbove\t"+itemsAboveNeutral);
    $.each(localStorage, function(key, value){
        if($('#'+key).length){
            $('#'+key).text(value);
            if(value === "Agree")
                $('#'+key).addClass('table-warning');
            if(value === "Strongly Agree")
                $('#'+key).addClass('table-danger');
        }
        if(isNaN(MMSEscore))
            MMSEscore = "N/A";
    })
    switch(itemsAboveNeutral){
        case 0:{
            riskCheckVNADS = 0;
            break;
        }
        case 1:{
            riskCheckVNADS = 0;
            break;
        }
        case 2:{
            riskCheckVNADS = 1;
            break;
        }
        case 3:{
            riskCheckVNADS = 2;
            break;
        }
        default:{
            riskCheckVNADS = 2;
            break;
        }
    }
    if(!isNaN(MMSEscore)){
        if((MMSEscore >= 0) && (MMSEscore < 10)){
            console.log("HIGH RISK MMSE\t" + MMSEscore);
            riskCheckMMSE = 2;
        }
        else if((MMSEscore >= 10) && (MMSEscore <= 20)){
            console.log("MODERATE RISK MMSE\t" + MMSEscore);
            riskCheckMMSE = 1;
        }
        else if((MMSEscore > 20)){
            console.log("LOW RISK MMSE\t" + MMSEscore);
            riskCheckMMSE = 0;
        }
    }
    outputText = "Based on the MMSE value of <strong>&nbsp;" + MMSEscore + "</strong>&nbsp;and the&nbsp;<a href='#vnadsResults'>VNADS</a>&nbsp;results (" + itemsAboveNeutral + " items above neutral) this individual is considered to be at";           
    if(!(isNaN(MMSEscore))){
        riskCheckMMSE > riskCheckVNADS ? riskCheck = riskCheckMMSE : riskCheck = riskCheckVNADS; //filter highest value to riskCheck
    }else{
        riskCheck = riskCheckVNADS;
    }
    console.log("riskCheck\t"+riskCheck);           
    switch(riskCheck){
        case 0:{
            riskCategory.text("Low-risk.").addClass('text-success');
            break;
        }
        case 1:{
            riskCategory.text("Moderate-risk.").addClass('text-warning');
            break;
        }
        default:{
            riskCategory.text("High-risk.").addClass('text-danger');
            highRiskOutput.text('It may be advisable in this case, to exclude songs in a minor key from any created playlists.')
            break;
        }
    }
    $('#VNADSoutputDiv').append(outputText, '&nbsp;', riskCategory, '&nbsp;', highRiskOutput);
}
function getCTC(){
    var ctcText;
    $('#ctcResultTable').show();
    if(selectedCTCtext.length === 1){
        ctcText = "There is " + selectedCTCtext.length + " playlist to make for the following situation and is highlighted for intensity in the &nbsp;<a href='#ctcResults'>Challenges to Care</a> table below:<br>(Intensity of colour highlights the importance of the playlist.)";
        getCTCtdText();
    }else if (selectedCTCtext.length > 1){
        ctcText = "There are " + selectedCTCtext.length + " playlists to make for the following situations and are highlighted for intensity in the&nbsp;<a href='#ctcResults'>Challenges to Care</a> table below:<br>(Intensity of colour highlights the importance of each required playlist.)";
        getCTCtdText();
    }else
        ctcText = "There are no playlists suggested for this individual.";
    $('#CTCoutputDiv').prepend(ctcText);
}
function getCTCtdText(){
    for (var i = 0; i < selectedCTCtext.length; i++){
        $('#CTCoutputDiv').append('<br> - ', selectedCTCtext[i], '.');
    }
}

function loadPatientVQ(){
    var arraySize;
    var questionArray = new Array();
    questionArray.push(
        "In the last 2 weeks I have had little interest or pleasure in doing things",
        "In the last 2 weeks I have felt down, depressed or hopeless",
        "Often throughout my life I have felt down, depressed or hopeless",
        "In the past 2 weeks I have felt so restless it is hard to sit still",
        "I have often had periods in my life where I felt so restless it was hard to sit still",
        "Sometimes I feel so upset that I want to hit or kick something",
        "Sometimes I feel so stirred up inside I want to scream",
        "Listening to music can sometimes bring back distressing memories",
        "Sometimes I get so stirred up by music that my emotions feel overwhelming."
    );
    for(arraySize = 0; arraySize < questionArray.length; arraySize++){
        document.getElementById("vq"+arraySize.toString()).innerHTML = questionArray[arraySize];
    }
}
function loadCaregiverVQ(){
    var arraySize;
    var questionArray = new Array();
    questionArray.push(
        "In the last 2 weeks he/she has had little interest or pleasure in doing things",
        "In the last 2 weeks he/she has felt down, depressed or hopeless",
        "Often throughout his/her life he/she has felt down, depressed or hopeless",
        "In the past 2 weeks he/she has found it hard to sit still",
        "He/she has often had periods where he/she felt so restless it was hard to sit still",
        "Sometimes he/she feel so upset that he/she hits or kicks something",
        "Sometimes he/she feels so stirred up that he/she screams",
        "Sometimes listening to music can bring back distressing memories to him/her",
        "Sometimes he/she experiences overwhelming emotions in response to music."
    );
    for(arraySize = 0; arraySize < questionArray.length; arraySize++){
        document.getElementById("vq"+arraySize.toString()).innerHTML = questionArray[arraySize];
    }
}
function disableVNADSradios(){
    $('#vnadsForm :radio').each(function(){
        $(this).prop({
            checked: false
        })
    });
    $('#MMSEscore').each(function(){
        $(this).text('');
    })
}
function disableFields(){
    disableDancing();
    disableInstrument();
    disableSinging();
    disableOptions();
}
function disableOptions(){
    $('option[value=""]').each(function(){
        $(this).prop({
            selected: true,
            disabled: true
        });
    });
    $("#f1 textarea, #f1 text").each(function(){
        $(this).val('');
    }); 
    $('option').not('[value=""]').each(function(){
        $(this).prop({
            selected: false,
            disabled: false
        });
    });       
}
function disableInstrument(){
    $("#instrumentText, #instrumentTimeText, #singingText, #dancingText").each(function(){
        $(this).attr({
            disabled: true,
            placeholder: "",
            value: ""
        });
    })
    $("#instrumentBooleanNo").prop("checked",true);
}
function disableSinging(){
    $("#singingText").attr({
        disabled: true,
        placeholder: "",
        value: ""
    });
    $("#singingBooleanNo").prop("checked",true);
}   
function disableDancing(){
    $("#dancingText").attr({
        disabled: true,
        placeholder: "",
        value: ""
    })
    $("#dancingBooleanNo").prop("checked",true);
}
function enableSinging(){
    $("#singingText").attr({
        disabled: false,
        placeholder: "Please specify (e.g. around-the house, in choir etc.)"
    })
}
function enableDancing(){
    $("#dancingText").attr({
        disabled: false,
        placeholder: "Please specify (e.g. attended dance lessons, socials)"
    });
}   
function enableInstrument(){
    $("#instrumentText").attr({
        disabled: false,
        placeholder: "Please specify the instrument (e.g. piano, guitar)"
    });
    $("#instrumentTimeText").attr({
        disabled: false,
        placeholder: "How long have you been playing this instrument?"
    });
}
function loadPatientMusicPrefQs(){
    $("#questionnaireType").text("Patient Questionnaire");
    $("#app1Footer").hide();
    $("#musicImportanceLabel").text("How important has music been to you in your life?");
    $("#instrumentLabel").text("Do/did you play a musical instrument?");
    $("#singingLabel").text("Do/did you enjoy singing?");
    $("#dancingLabel").text("Do/did you enjoy dancing?");
    $("#genreLabel").text("The following is a list of different types of music, Please indicate your 3 most favourite types with 1 being the most favourite, 2 the next and 3 the third favourite:");
    $("#preferenceLabel").text("Do you prefer:");
    $("#happySongsLabel").text("Please identify as many songs as you can think of that make you feel happy.");
    $("#sadSongsLabel").text("Please identify any specific songs that you can think of which you find sad or distressing to listen to.");
    $("#happyArtistsLabel").text("Please identify specific artists or performers that you enjoy listening to the most.");
    $("#personalAlbumsLabel").text("Name some albums that you have in your personal music library.");
}
function loadCaregiverMusicPrefQs(){
    $("#questionnaireType").text("Caregiver Questionnaire");
    $("#app1Footer").show();
    $("#app1Footer").text("Please complete this questionnaire based on your knowledge of the individual's music preferences.");
    $("#musicImportanceLabel").text("How important has music been in his/her life?");
    $("#instrumentLabel").text("Does/did he/she play a musical instrument?");
    $("#singingLabel").text("Does/did he/she enjoy singing?");
    $("#dancingLabel").text("Does/didDoes/did he/she enjoy dancing?");
    $("#genreLabel").text("The following is a list of different types of music, Please indicate the individual's 3 most favourite types with 1 being the most favourite, 2 the next and 3 the third favourite:");
    $("#preferenceLabel").text("Does the individual prefer:");
    $("#happySongsLabel").text("Please identify as many songs as you can think of that makes the individual feel happy.");
    $("#sadSongsLabel").text("Please identify any specific songs that you can think of which might make the individual feel sad or that could be associated with distressing memories.");
    $("#happyArtistsLabel").text("Please identify specific artists or performers that the individual most enjoys listening to.");
    $("#personalAlbumsLabel").text("Name some albums that the individual has in his/her personal music library.");
}
function loadPatientVNADS(){
    $(".VNADStype").text("Version for the person with dementia");
    $("#VNADSq1").text("In the last 2 weeks I have had little interest or pleasure in doing things");
    $("#VNADSq2").text("In the last 2 weeks I have felt down, depressed or hopeless");
    $("#VNADSq3").text("Often throughout my life I have felt down, depressed or hopeless");
    $("#VNADSq4").text("In the past 2 weeks I have felt so restless it is hard to sit still");
    $("#VNADSq5").text("I have often had periods in my life where I felt so restless it was hard to sit still");
    $("#VNADSq6").text("Sometimes I feel so upset that I want to hit or kick something");
    $("#VNADSq7").text("Sometimes I feel so stirred up inside I want to scream");
    $("#VNADSq8").text("Listening to music can sometimes bring back distressing memories");
    $("#VNADSq9").text("Sometimes I get so stirred up by music that my emotions feel overwhelming ");
}
function loadCaregiverVNADS(){
    $(".VNADStype").text("Family version");
    $("#VNADSq1").text("In the last 2 weeks he/she has had little interest or pleasure in doing things");
    $("#VNADSq2").text("In the last 2 weeks he/she has felt down, depressed or hopeless");
    $("#VNADSq3").text("Often throughout his/her life he/she has felt down, depressed or hopeless");
    $("#VNADSq4").text("In the past 2 weeks he/she has found it hard to sit still");
    $("#VNADSq5").text("He/she has often had periods where he/she felt so restless it was hard to sit still");
    $("#VNADSq6").text("Sometimes he/she feel so upset that he/she hits or kicks something");
    $("#VNADSq7").text("Sometimes he/she feels so stirred up that he/she screams");
    $("#VNADSq8").text("Sometimes listening to music can bring back distressing memories to him/her");
    $("#VNADSq9").text("Sometimes he/she experiences overwhelming emotions in response to music ");
}
function loadPatientQ(){
    var arraySize;
    var questionArray = new Array();
    questionArray.push(
        "How important has music been to you in your life:",
        "Do/did you play a musical instrument? If yes, please specify (e.g. piano, guitar)",
        "If yes, how long have you been playing this instrument?",
        "Do/did you enjoy singing? If yes, please specify (e.g. around-the house, in choir etc.)",
        "Do/did you enjoy dancing? If yes, please specify (e.g. attended dance lessons, socials)",
        "Top 3 favourite genres",
        "Favourite form of instrumentation:",
        "Please identify as many songs as you can think of that make you feel happy.",
        "Please identify any specific songs that you can think of which you find sad or distressing to listen to.",
        "Please identify specific artists or performers that you enjoy listening to the most.",
        "Name some albums that you have in your personal music library."
    );
    for(arraySize = 0; arraySize < questionArray.length; arraySize++){
        document.getElementById("q"+arraySize.toString()).innerHTML = questionArray[arraySize];
    }
}
function loadCaregiverQ(){
    var arraySize;
    var questionArray = new Array();
    questionArray.push(
        "How important has music been in his/her life?",
        "Does/did he/she play a musical instrument? If yes, please specify (e.g. piano, guitar)",
        "If yes, how long have they been playing this instrument?",
        "Does/did he/she enjoy singing? If yes, please specify (e.g. around-the house, in choir etc.)",
        "Does/did he/she enjoy dancing? If yes, please specify (e.g. attended dance lessons, socials)",
        "Top 3 favourite genres",
        "The individuals favourite forms of instrumentation:",
        "Please identify as many songs as you can think of that makes the individual feel happy.",
        "Please identify any specific songs that you can think of which might make the individual feel sad or that could be associated with distressing memories.",
        "Please identify specific artists or performers that the individual most enjoys listening to.",
        "Name some albums that the individual has in his/her personal music library."
    );
    for(arraySize = 0; arraySize < questionArray.length; arraySize++){
        document.getElementById("q"+arraySize.toString()).innerHTML = questionArray[arraySize];
    }
}

function loadClassicalMusic(){
    musicTitle = [];
    musicComposer = [];
    musicDuration = [];
    musicBPM = [];
    musicDecade = [];
    musicYoutube = [];
    musicSpotify = [];
    musicTitle.push(
        "Arioso, from Cantata BWV 156",
        "Adagio in G Minor",
        "Gymnopedie",
        "Nimrod, from Enigma Variations",
        "Canon in D",
        "Meditation from Thais",
        "Mio Babbino Caro",
        "On the Beautiful Blue Danube",
        "Ave Verum Corpus, K618",
        "Jesu, Joy of Man's Desiring",
        "Sheep May Safely Graze",
        "String Quartet in F",
        "Magnificat, Gloria Patri",
        "Nessun Dorma",
        "Ave Maria",
        "Clarinet Concerto",
        "Air on the G string",
        "Nocturne in E flat major, Opus 9, No. 2",
        "Piano Concerto No. 21 , Andante",
        "Cello Suite No 1, 1st movement",
        "Peer Gynt Suite No 1., Morning Mood",
        "Dance of the Swans",
        "Minuet, from Quintet in E major",
        "Claire de Lune",
        "Be Thou But Near",
        "Trumpet Concerto in D"
    );
    musicComposer.push(
        "J. S. Bach",
        "Albinoni",
        "Satie",
        "Elgar",
        "Pachelbel",
        "Massenet",
        "Puccini",
        "Strauss",
        "Mozart",
        "J. S. Bach",
        "J. S. Bach",
        "Hoffstetter",
        "J. S. Bach",
        "Puccini",
        "Caccini",
        "Mozart",
        "J. S. Bach",
        "Chopin",
        "Mozart",
        "J. S. Bach",
        "Edvard Grieg",
        "Tchiakovsky",
        "Boccherini",
        "Debussy",
        "J. S. Bach",
        "Telemann"
    );
    musicBPM.push(
        "44",
        "53",
        "40",
        "52",
        "40",
        "52",
        "78",
        "55",
        "70",
        "65",
        "60",
        "72",
        "80",
        "60",
        "74",
        "98",
        "78",
        "74",
        "60",
        "80",
        "100",
        "100",
        "88",
        "74",
        "84",
        "58"
    );
    musicYoutube.push(
        "https://www.youtube.com/watch?v=xueopsTHesw",
        "https://www.youtube.com/watch?v=XMbvcp480Y4",
        "https://www.youtube.com/watch?v=S-Xm7s9eGxU",
        "https://www.youtube.com/watch?v=sUgoBb8m1eE",
        "https://www.youtube.com/watch?v=NlprozGcs80",
        "https://www.youtube.com/watch?v=luL1T1WQC2k",
        "https://www.youtube.com/watch?v=0Wlcr2bIKmk",
        "https://www.youtube.com/watch?v=_CTYymbbEL4",
        "https://www.youtube.com/watch?v=6KUDs8KJc_c",
        "https://www.youtube.com/watch?v=S6OgZCCoXWc",
        "https://www.youtube.com/watch?v=ZIUCRXMM4pE",
        "https://www.youtube.com/watch?v=57Iit0GXR48",
        "https://www.youtube.com/watch?v=GvaLk75lvMU",
        "https://www.youtube.com/watch?v=Uau48wh5CeI",
        "https://www.youtube.com/watch?v=4mBJIbQHTHY",
        "https://www.youtube.com/watch?v=YT_63UntRJE",
        "https://www.youtube.com/watch?v=GMkmQlfOJDk",
        "https://www.youtube.com/watch?v=9E6b3swbnWg",
        "https://www.youtube.com/watch?v=df-eLzao63I",
        "https://www.youtube.com/watch?v=mGQLXRTl3Z0",
        "https://www.youtube.com/watch?v=kzTQ9fjforY",
        "https://www.youtube.com/watch?v=sd4VsbM4fOo",
        "https://www.youtube.com/watch?v=kSE15tLBdso",
        "https://www.youtube.com/watch?v=CvFH_6DNRCY",
        "https://www.youtube.com/watch?v=ffk2UDadZhY",
        "https://www.youtube.com/watch?v=ufGl19HiAC0"
    );
    musicSpotify.push(
        "https://open.spotify.com/track/5kf4HfZ2YjSiM2rDSod8cF",
        "https://open.spotify.com/track/23TuMSMayxMXK9XDsoRlWG",
        "https://open.spotify.com/track/5NGtFXVpXSvwunEIGeviY3",
        "https://open.spotify.com/track/5t9UkwkrumEmOpnz3SRdbm",
        "https://open.spotify.com/track/38Fw12XM4nHUMIBZKwmf5y",
        "https://open.spotify.com/track/0XfFRLi9G87t57kqZAzeef",
        "https://open.spotify.com/track/1oi7QvpgDkBFTROce7LkB8",
        "https://open.spotify.com/track/7pcmPV375MtXkJbw85bP11",
        "https://open.spotify.com/track/6hEZXxgVWf20OK5sXDh6IB",
        "https://open.spotify.com/track/2Tz7fLm0pWasWCCfJiHPlJ",
        "https://open.spotify.com/track/7wEql4SrP9nL5U4zxmcrVM",
        "https://open.spotify.com/track/6twZ92WV9VakyBJimPMZtD",
        "https://open.spotify.com/track/2ts7WPZeLsAmQeF4z1VOCl",
        "https://open.spotify.com/track/74WjYdm3Lvbwnds4thYPUU",
        "https://open.spotify.com/track/4WlxkezQytVXHqtPqq8bHe",
        "https://open.spotify.com/track/6mhf5DiX8a1t6XAJ8sAJmH",
        "https://open.spotify.com/track/3m4dVSxNb0c1vZlidiptNY",
        "https://open.spotify.com/track/5Ffyx8LUFE0MpUeCwApmAP",
        "https://open.spotify.com/track/1eCouLD4K2IkqPQ23CVlLl",
        "https://open.spotify.com/track/17i5jLpzndlQhbS4SrTd0B",
        "https://open.spotify.com/track/70nfm7IEXnFdxLtvxdXnZq",
        "https://open.spotify.com/album/7dVA06E7AP7P7VzPyNxQVO",
        "https://open.spotify.com/track/5fkc9NoaZCAduWdV2O36Us",
        "https://open.spotify.com/track/2BnSppAgqmEfmtjSBLmNEt",
        "https://open.spotify.com/track/51fQNleEd8eEtWfVBxygXQ",
        "https://open.spotify.com/track/7x5ULIYm82gnWvhYCXfzyj"
    );
    for(arrayLimit = 0; arrayLimit < musicTitle.length; arrayLimit++){
        $('#classicalTable tbody').append('<tr><td class="text-left align-middle">'+musicTitle[arrayLimit]+'</td><td class="text-left align-middle">'+musicComposer[arrayLimit]+'</td><td class="text-center align-middle">'+musicBPM[arrayLimit]+'</td><td class="text-center align-middle"><a href="'+musicYoutube[arrayLimit]+'" target="_blank"><img src="img/yt_play.png" style="height: 30%"></a></td><td class="text-center align-middle"><a href="'+musicSpotify[arrayLimit]+'" target="_blank"><img src="img/spotify_play.png" style="height: 15%"></a></td></tr>');
    }
}
function loadCountryMusic(){
    musicTitle = [];
    musicComposer = [];
    musicDuration = [];
    musicBPM = [];
    musicDecade = [];
    musicYoutube = [];
    musicSpotify = [];
    musicTitle.push(
        "Mexicali Rose",
        "Wild Side of Life",
        "Smoke On the Water",
        "When My Blue Moon Turns to Gold Again",
        "Blueberry Hill",
        "Bouquet of Roses",
        "The Song from Moulin Rouge",
        "Tennessee Waltz",
        "The Rains Came",
        "Lay Lady Lay",
        "A Single Girl",
        "Back in the Arms of Love",
        "You Are My Sunshine",
        "You Were Always On My Mind",
        "Country Roads",
        "Fire On the Mountain"
    );
    musicComposer.push(
        "Johnny Bond",
        "Hank Thompson",
        "Red Foley",
        "Walker & Sullivan",
        "Gene Autry",
        "Eddy Arnold",
        "Andy Williams",
        "Patti Page",
        "Freddy Fender",
        "Bob Dylan",
        "Sandy Posey",
        "The Spinners",
        "Elizabeth Mitchell",
        "Willie Nelson",
        "John Denver",
        "Marshall Tucker Band"
    );
    musicDuration.push(
        "2:48",
        "2:45",
        "2:44",
        "2:35",
        "2:37",
        "2:33",
        "2:23",
        "3:05",
        "2:16",
        "3:17",
        "2:24",
        "3:51",
        "2:49",
        "3:36",
        "3:18",
        "3:56"
    );
    musicBPM.push(
        "110",
        "116",
        "111",
        "79",
        "106",
        "68",
        "95",
        "87",
        "116",
        "80",
        "109",
        "104",
        "92",
        "72",
        "84",
        "102"
    );
    musicDecade.push(
        "1940",
        "1940",
        "1940",
        "1940",
        "1940",
        "1940",
        "1950",
        "1950",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1970",
        "1970",
        "1970"
    );
    musicYoutube.push(
        "https://www.youtube.com/watch?v=0aB126n5By8",
        "https://www.youtube.com/watch?v=OPvARPfquPc",
        "https://www.youtube.com/watch?v=PLSmj9G0cE0",
        "https://www.youtube.com/watch?v=snfKM07hFo0",
        "https://www.youtube.com/watch?v=tdJSBtuS0oc",
        "https://www.youtube.com/watch?v=7qECR90Qpa8",
        "https://www.youtube.com/watch?v=If_mCEoV0Cc",
        "https://www.youtube.com/watch?v=-XCvfy6Huyc",
        "https://www.youtube.com/watch?v=WAL5ebTrUJk",
        "https://www.youtube.com/watch?v=LhzEsb2tNbI",
        "https://www.youtube.com/watch?v=3KD8gptsQJA",
        "https://www.youtube.com/watch?v=uNOyh4yUG88",
        "https://www.youtube.com/watch?v=1moWxHdTkT0",
        "https://www.youtube.com/watch?v=R7f189Z0v0Y",
        "https://www.youtube.com/watch?v=1vrEljMfXYo",
        "https://www.youtube.com/watch?v=0uMWbZj-gWg"
    );
    musicSpotify.push(
        "https://open.spotify.com/track/7KvOcys9k4byBX7bEIYbXa",
        "https://open.spotify.com/track/39AxeDwNIyjPKgI7g9H2Jg",
        "https://open.spotify.com/track/3PKq7hgLzdwQsVRY8Ucakt",
        "https://open.spotify.com/track/0rhYTqMgwibXlFotHGTpCk",
        "https://open.spotify.com/track/11PQgFPtRMpCKOpGMZewKY",
        "https://open.spotify.com/track/2iM66C4ttfO2kMc2eLYzHq",
        "https://open.spotify.com/track/6u4RHQpFXlz5iq4Hm0XyrY",
        "https://open.spotify.com/track/0BHroBUvBAp561BYqC9LRK",
        "https://open.spotify.com/track/0MTDGgl4FIVnS1nxrwcK1W",
        "https://open.spotify.com/track/4uYwlMp841PLJmj1gJJwIq",
        "https://open.spotify.com/track/71Jb69WxX0c0Qt0TDE3VIf",
        "https://open.spotify.com/track/5RXUO8ARm3J93hzcjlX6Uj",
        "https://open.spotify.com/track/10CsMKlayFJOj4Lai9tAvm",
        "https://open.spotify.com/track/5GkIAFzZsMy2JxadHk61yu",
        "https://open.spotify.com/track/39q7xibBdRboeMKUbZEB6g",
        "https://open.spotify.com/track/4delgtiKX7L3nsbC0exhCS"
    );
    for(arrayLimit = 0; arrayLimit < musicTitle.length; arrayLimit++){
        $('#countryTable tbody').append('<tr><td>'+musicTitle[arrayLimit]+'</td><td>'+musicComposer[arrayLimit]+'</td><td class="text-center align-middle">'+musicDuration[arrayLimit]+'</td><td class="text-center align-middle">'+musicBPM[arrayLimit]+'</td><td class="text-center align-middle">'+musicDecade[arrayLimit]+'</td><td class="text-center align-middle"><a href="'+musicYoutube[arrayLimit]+'" target="_blank"><img src="img/yt_play.png" style="height: 30%"></a></td><td class="text-center align-middle"><a href="'+musicSpotify[arrayLimit]+'" target="_blank"><img src="img/spotify_play.png" style="height: 15%"></a></td></tr>');
    }
}
function loadFolkMusic(){
    musicTitle = [];
    musicComposer = [];
    musicDuration = [];
    musicBPM = [];
    musicDecade = [];
    musicYoutube = [];
    musicSpotify = [];
    musicTitle.push(
        "The Foggy, Foggy Dew",
        "Waly Waly (The Water Is Wide)",
        "Nottamun Town",
        "Marble Halls",
        "Sweet Polly Oliver",
        "The Minstrel Boy",
        "The Lincolnshire Poacher",
        "Tom Bowling",
        "Boll Weevil Holler",
        "Bridge Over Troubled Water",
        "We'll Sing in the Sunshine",
        "Proud Maisie",
        "The Carnival is Over",
        "Dress Rehearsal Rag",
        "All Kinds of Everything"
    );
    musicComposer.push(
        "N/A",
        "N/A",
        "Jean Ritchie",
        "Enya",
        "Felicity Lott with Graham Johnson",
        "John McDermott",
        "N/A",
        "N/A",
        "Vera Holler",
        "Simon & Garfunkel",
        "Gale Garnett",
        "Davy Graham & Shirley Collins",
        "The Seekers",
        "Leonard Cohen",
        "Dana Scallon"
    );
    musicDuration.push(
        "N/A",
        "N/A",
        "3:40",
        "3:55",
        "2:19",
        "3:24",
        "2:05",
        "4:32",
        "2:03",
        "4:52",
        "2:59",
        "4:04",
        "3:13",
        "6:06",
        "3:05"
    );
    musicBPM.push(
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "76",
        "88",
        "107",
        "68",
        "76",
        "94",
        "100",
    );
    musicDecade.push(
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1970"
    );
    musicYoutube.push(
        "https://www.youtube.com/watch?v=tzyteR2_nOU",
        "https://www.youtube.com/watch?v=OplocXo1Lzo",
        "https://www.youtube.com/watch?v=TsUKApb2gr8",
        "https://www.youtube.com/watch?v=Fp5t2yIiR-U",
        "https://www.youtube.com/watch?v=50DJCcUkbYc",
        "https://www.youtube.com/watch?v=0ssHxZABrpE",
        "https://www.youtube.com/watch?v=E8KQyJyOVKc",
        "https://www.youtube.com/watch?v=m0EuqJLhhDA",
        "https://www.youtube.com/watch?v=6S7CASW39L4",
        "https://www.youtube.com/watch?v=H_a46WJ1viA",
        "https://www.youtube.com/watch?v=udvUM7iQz-g",
        "https://www.youtube.com/watch?v=NUEck2Nch80",
        "https://www.youtube.com/watch?v=z4ZipKdI1sY",
        "https://www.youtube.com/watch?v=AhVW0vMljP8",
        "https://www.youtube.com/watch?v=8xmnd3uiK_Y",
    );
    musicSpotify.push(
        "https://open.spotify.com/track/52bGJTusAslWsvpPguiFn6",
        "https://open.spotify.com/track/6oa8WaQfNN0b49eyUhz5V8",
        "https://open.spotify.com/track/5srUACkeWweXh7Env1B7oU",
        "https://open.spotify.com/track/3smqY3VDKQ4HLfvdFMCEuG",
        "https://open.spotify.com/track/1T42ldgR5YjMCyuVLM9kYX",
        "https://open.spotify.com/track/4QqHHx2YPg6j9Q0UTmQ0wG",
        "https://open.spotify.com/track/4j8mJiI6OQXYTkjHk8nTc7",
        "https://open.spotify.com/track/0AanL9Wb5NH18bStYjMEsO",
        "https://open.spotify.com/track/2CclnvbeJxf1LpJNfkGoJy",
        "https://open.spotify.com/track/6l8EbYRtQMgKOyc1gcDHF9",
        "https://open.spotify.com/track/3WYYzUlLrl4NVNeoKd7MnG",
        "https://open.spotify.com/track/48PUaGLcCo4qdRv0CZRzzn",
        "https://open.spotify.com/track/4rtnLe7BMoqxUj4Y8Wgqf6",
        "https://open.spotify.com/track/5JBjzDKCWZKTe6PPQTN0GY",
        "https://open.spotify.com/track/3SJPRPwpF0MTFKPrshBeKM"
    );
    for(arrayLimit = 0; arrayLimit < musicTitle.length; arrayLimit++){
        $('#folkTable tbody').append('<tr><td>'+musicTitle[arrayLimit]+'</td><td>'+musicComposer[arrayLimit]+'</td><td class="text-center align-middle">'+musicDuration[arrayLimit]+'</td><td class="text-center align-middle">'+musicBPM[arrayLimit]+'</td><td class="text-center align-middle">'+musicDecade[arrayLimit]+'</td><td class="text-center align-middle"><a href="'+musicYoutube[arrayLimit]+'" target="_blank"><img src="img/yt_play.png" style="height: 30%"></a></td><td class="text-center align-middle"><a href="'+musicSpotify[arrayLimit]+'" target="_blank"><img src="img/spotify_play.png" style="height: 15%"></a></td></tr>');
    }
}
function loadReligionMusic(){
    musicTitle = [];
    musicComposer = [];
    musicDuration = [];
    musicBPM = [];
    musicDecade = [];
    musicYoutube = [];
    musicSpotify = [];
    musicTitle.push(
        "How Great Thou Art",
        "Come You Not From Newcastle",
        "Just A Closer Walk With Thee",
        "Swing Low, Sweet Chariot",
        "Deep River",
        "Great Is Thy Faithfulness",
        "A Mighty Fortress is Our God",
        "Onward Christian Soldiers",
        "All Things Bright and Beautiful",
        "Let All Mortal Flesh Keep Silent",
        "Nearer to God, To Thee",
        "Jerusalem"
    );
    musicYoutube.push(
        "https://www.youtube.com/watch?v=Cc0QVWzCv9k",
        "https://www.youtube.com/watch?v=dr9Pykd4HGA",
        "https://www.youtube.com/watch?v=OOKaircCiGI",
        "https://www.youtube.com/watch?v=v8frEt6w4G8",
        "https://www.youtube.com/watch?v=9qXBG5BRT3c",
        "https://www.youtube.com/watch?v=2eQ1oal44wU",
        "https://www.youtube.com/watch?v=8XUYZoguhEQ",
        "https://www.youtube.com/watch?v=64K7HmLM54Y",
        "https://www.youtube.com/watch?v=FT_oDqOEGpc",
        "https://www.youtube.com/watch?v=n734FhIuvSs",
        "https://www.youtube.com/watch?v=v1mQT1u_45I",
        "https://www.youtube.com/watch?v=MKRHWT6xdEU"
    );
    musicSpotify.push(
        "https://open.spotify.com/track/3IStqJutFTgEzYANWB8gUh",
        "https://open.spotify.com/track/1MHcKQMvxk1grG0JZJrYq9",
        "https://open.spotify.com/track/77yuUBfsUyn8BuvxIWjCNi",
        "https://open.spotify.com/track/7tfAVm2Fam6FpCkYhfcngh",
        "https://open.spotify.com/track/0JXSi46jgn17CpDT6haz2O",
        "https://open.spotify.com/track/73ZGW3v5caUFBsHSkQQfpX",
        "https://open.spotify.com/track/24zh5vOJrDpvKeEnjas28h",
        "https://open.spotify.com/track/3Xt8HNm93F9Crcp3K4m9Zs",
        "https://open.spotify.com/track/4a4uX5lcGcJekRrYnljTS5",
        "https://open.spotify.com/track/2jB3izp9XvTIOkpBsI6i7H",
        "https://open.spotify.com/track/5lGLZg99gLJYWqUmcf7GmD",
        "https://open.spotify.com/track/4Yvwmzuxvs3rwxjSB14CTq"
    );
    for(arrayLimit = 0; arrayLimit < musicTitle.length; arrayLimit++){
        $('#religionTable tbody').append('<tr><td>'+musicTitle[arrayLimit]+'</td><td class="text-center align-middle"><a href="'+musicYoutube[arrayLimit]+'" target="_blank"><img src="img/yt_play.png" style="height: 30%"></a></td><td class="text-center align-middle"><a href="'+musicSpotify[arrayLimit]+'" target="_blank"><img src="img/spotify_play.png" style="height: 15%"></a></td></tr>');
    }
}
function loadJazzMusic(){
    musicTitle = [];
    musicComposer = [];
    musicDuration = [];
    musicBPM = [];
    musicDecade = [];
    musicYoutube = [];
    musicSpotify = [];
    musicTitle.push(
        "Blues in the Night",
        "Memories of You",
        "Ain't Misbehavin",
        "Bop, Look and Listen",
        "Ev'ry Time We Say Goodbye",
        "I Get Along Without You Very Well",
        "Blue in Green",
        "The Girl From Ipanema",
        "Thunder Walk",
        "Can't Help Lovin' Dat Man",
        "Try Me",
        "Non, Je Ne Regrette Rien",
        "Is that All There Is?",
        "All That Jazz"
    );
    musicComposer.push(
        "Ella Fitzgerald",
        "Benny Goodman",
        "Fats Waller",
        "George Shearing Quintet",
        "Ella Fitzgerald",
        "Chet Baker",
        "Miles Davis",
        "Carlos Jobim",
        "George Benson",
        "Ava Gardner",
        "James Brown",
        "Edith Piaf",
        "Peggy Lee",
        "Ralph Burns"
    );
    musicDuration.push(
        "7:11",
        "3:20",
        "3:58",
        "2:57",
        "3:34",
        "3:00",
        "5:38",
        "5:22",
        "4:42",
        "3:23",
        "2:33",
        "2:22",
        "4:22",
        "1:31"
    );
    musicBPM.push(
        "80",
        "86",
        "98",
        "116",
        "80",
        "103",
        "76",
        "136",
        "124",
        "< 80",
        "72",
        "92",
        "108",
        "124"
    );
    musicDecade.push(
        "1940",
        "1940",
        "1940",
        "1950",
        "1950",
        "1950",
        "1950",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1970"
    );
    musicYoutube.push(
        "https://www.youtube.com/watch?v=hXhxXYgKXd8",
        "https://www.youtube.com/watch?v=DWPLZ6FZiLI",
        "https://www.youtube.com/watch?v=PSNPpssruFY",
        "https://www.youtube.com/watch?v=O7iRrJX6qiA",
        "https://www.youtube.com/watch?v=nP-8dzS1_rM",
        "https://www.youtube.com/watch?v=IgbPHTBiAVQ",
        "https://www.youtube.com/watch?v=PoPL7BExSQU",
        "https://www.youtube.com/watch?v=aFlEOn20UiA",
        "https://www.youtube.com/watch?v=ntnqO7fVyZI",
        "https://www.youtube.com/watch?v=rGOyycNqiWA",
        "https://www.youtube.com/watch?v=K2XY6oRD2xc",
        "https://www.youtube.com/watch?v=Gsz7IuZ3paM",
        "https://www.youtube.com/watch?v=LCRZZC-DH7M",
        "https://www.youtube.com/watch?v=Yzsxs3LytFU"
    );
    musicSpotify.push(
        "https://open.spotify.com/track/3sorSUfFZxURmP1263pELv",
        "https://open.spotify.com/track/1hHfLxkamOmu15txpRNKni",
        "https://open.spotify.com/track/3BFRqZFLSrqtQr6cjHbAxU",
        "https://open.spotify.com/track/4cN4fMd4xriPaQOCTdxdf1",
        "https://open.spotify.com/track/5FGNCvHEKnsrSZtyTkZpLM",
        "https://open.spotify.com/track/4gFlHAye7To29Fs4UszQUH",
        "https://open.spotify.com/track/0aWMVrwxPNYkKmFthzmpRi",
        "https://open.spotify.com/track/1AxAPXcUcH3nXXeCeG0kGV",
        "https://open.spotify.com/track/6zxhAR5wFwpelxxn8TnISM",
        "https://open.spotify.com/track/5Ce4hw2i3eUmocwMG0NyTZ",
        "https://open.spotify.com/track/7bFfjakySYhojqSPrAPtc3",
        "https://open.spotify.com/track/3dkIE8P7hvl3tHl9KSb6dA",
        "https://open.spotify.com/track/0TLD1RLFqPmpVR5ATWdMz6",
        "https://open.spotify.com/track/3sBhuoywTZ9sctIo8OHXlx"
    );
    for(arrayLimit = 0; arrayLimit < musicTitle.length; arrayLimit++){
        $('#jazzTable tbody').append('<tr><td>'+musicTitle[arrayLimit]+'</td><td>'+musicComposer[arrayLimit]+'</td><td class="text-center align-middle">'+musicDuration[arrayLimit]+'</td><td class="text-center align-middle">'+musicBPM[arrayLimit]+'</td><td class="text-center align-middle">'+musicDecade[arrayLimit]+'</td><td class="text-center align-middle"><a href="'+musicYoutube[arrayLimit]+'" target="_blank"><img src="img/yt_play.png" style="height: 30%"></a></td><td class="text-center align-middle"><a href="'+musicSpotify[arrayLimit]+'" target="_blank"><img src="img/spotify_play.png" style="height: 15%"></a></td></tr>');
    }
}
function loadPopMusic(){
    musicTitle = [];
    musicComposer = [];
    musicDuration = [];
    musicBPM = [];
    musicDecade = [];
    musicYoutube = [];
    musicSpotify = [];
    musicTitle.push(
        "If You Were the Only Girl in the World",
        "White Christmas",
        "Danny Boy",
        "When I Grow Too Old to Dream",
        "Lily Marlene",
        "In the Wee Small Hours of the Morning",
        "White Cliffs of Dover",
        "I'll Be Seeing You",
        "Don't Worry ‘Bout Me",
        "Something Stupid",
        "Magic Moments",
        "Just An Old Fashioned Girl",
        "Let's Do It (Let's Fall In Love)",
        "Catch a Falling Star",
        "Day-O (Banana Boat Song)",
        "Rose Marie",
        "Perhaps, Perhaps, Perhaps",
        "You Belong to Me",
        "Little Things Mean A Lot",
        "Volare",
        "I'll Be Home",
        "Que Sera Ser",
        "Unchained Melody",
        "Secret Love",
        "Because You're Mine",
        "Edelweiss",
        "Oh Donna",
        "Unforgettable",
        "Hello Young Lovers",
        "You Made Me Love You",
        "Juliet",
        "Wonderful Land",
        "Little Egypt",
        "Moon River",
        "Roses are Red",
        "Wishin and Hopin",
        "Stranger on the Shore",
        "Tell Laura I Love Her",
        "It's Only Make Believe",
        "Calendar Girl",
        "The Pink Panther",
        "The Lonely Surfer",
        "These Arms of Mine",
        "Walking the Dog",
        "Hi-Heel Sneakers",
        "Save the Last Dance for Me",
        "Baby Elephant Walk",
        "If I Were A Rich Man",
        "Little Wing",
        "Hey Jude",
        "West Side Story Medley",
        "Daisy, Daisy (Bicycle Built for Two)",
        "And I Love Her",
        "True Blue",
        "I Will Always Love You",
        "Stand By Your Man",
        "Help Me Make it Through the Night",
        "Satin Sheets",
        "You Wear It Well",
        "The Entertainer",
        "Your Love Has Lifted Me Higher",
        "At Seventeen",
        "Send in the Clowns",
        "Cavatina",
        "I Can't Tell You Why",
        "I Honestly Love You",
        "Puppy Love",
        "You're a Lady",
        "Tonight's the Night",
        "How Deep Is Your Love",
        "Vincent",
        "From Little Things Big Thing Grow",
        "You'll Never Walk Alone"
    );
    musicComposer.push(
        "Dick Haymes",
        "Bing Crosby",
        "Various",
        "Foster & Allen",
        "Marlene Dietrich",
        "Frank Sinatra",
        "Vera Lynn",
        "Billie Holiday",
        "Billie Holiday",
        "Frank Sinatra, Nancy Sinatra",
        "Perry Como",
        "Eartha Kitt",
        "Ella Fitzgerald",
        "Perry Como",
        "Harry Belafonte",
        "Slim Whitman",
        "Doris Day",
        "Jo Stafford",
        "Kitty Kallen",
        "Dean Martin",
        "The Flamingos",
        "Doris Day",
        "Righteous Brothers",
        "Doris Day",
        "Mario Lanzo",
        "Rogers & Hammerstein",
        "Ritchie Valens",
        "Nat King Cole",
        "Frank Sinatra",
        "Dean Martin",
        "The Four Pennies",
        "The Shadows",
        "Elvis Presley",
        "Andy Williams",
        "Bobby Vinton",
        "Dusty Springfield",
        "The Ventures",
        "Ricky Valance",
        "Conway Twitty",
        "Neil Sedaka",
        "Henry Mancini",
        "Jack Nitzsche",
        "Otis Redding",
        "Rufus Thomas",
        "Tommy Tucker",
        "The Drifters",
        "Henry Mancini",
        "Jerry Bock",
        "Jimi Hendrix",
        "Beatles",
        "Leonard Bernstein",
        "Nat King Cole",
        "The Beatles",
        "John Williamson",
        "Dolly Parton",
        "Tammy Wynette",
        "Kris Kristofferson",
        "Jeanne Pruett",
        "Rod Stewart",
        "Marvin Hamlisch",
        "Rita Coolidge",
        "Janis Ian",
        "Barbara Streisand",
        "Stanley Myers",
        "The Eagles",
        "Olivia Newton John",
        "Paul Anka",
        "Peter Skellern",
        "Rod Stewart",
        "Bee Gees",
        "Don Maclean",
        "Paul Kelly",
        "Gerry and the Pacemakers"
    );
    musicDuration.push(
        "2:53",
        "2:57",
        "N/A",
        "2:21",
        "3:24",
        "2:59",
        "3:03",
        "3:31",
        "3:11",
        "2:38",
        "2:39",
        "2:51",
        "3:35",
        "2:30",
        "3:06",
        "2:23",
        "2:43",
        "3:18",
        "3:00",
        "3:02",
        "2:54",
        "2:32",
        "3:37",
        "3:37",
        "3:30",
        "1:43",
        "2:58",
        "2:31",
        "3:45",
        "3:21",
        "2:23",
        "2:08",
        "2:18",
        "2:44",
        "2:38",
        "2:57",
        "2:31",
        "2:40",
        "2:35",
        "2:42",
        "2:38",
        "2:34",
        "2:33",
        "2:38",
        "4:03",
        "2:29",
        "2:41",
        "5:07",
        "2:26",
        "8:10",
        "4:45",
        "1:45",
        "2:29",
        "4:06",
        "3:19",
        "2:13",
        "4:05",
        "3:03",
        "4:19",
        "3:00",
        "4:26",
        "4:59",
        "4:37",
        "4:21",
        "4:55",
        "3:40",
        "2:43",
        "4:35",
        "4:00",
        "3:58",
        "3:58",
        "6:52",
        "2:48"
    );
    musicBPM.push(
        "85",
        "104",
        "N/A",
        "116",
        "104",
        "69",
        "83",
        "64",
        "64",
        "108",
        "108",
        "120",
        "80",
        "124",
        "120",
        "136",
        "108",
        "76",
        "84",
        "124",
        "84",
        "60",
        "72",
        "76",
        "40",
        "108",
        "68",
        "68",
        "60",
        "84",
        "70",
        "136",
        "124",
        "68",
        "108",
        "108",
        "116",
        "116",
        "80",
        "124",
        "128",
        "104",
        "60",
        "116",
        "84",
        "76",
        "60",
        "72",
        "68",
        "72",
        "88",
        "68",
        "60",
        "56",
        "68",
        "56",
        "88",
        "56",
        "136",
        "80",
        "124",
        "64",
        "44",
        "60",
        "92",
        "76",
        "72",
        "92",
        "96",
        "108",
        "54",
        "60",
        "76"
    );
    musicDecade.push(
        "1940",
        "1940",
        "1940",
        "1940",
        "1940",
        "1940",
        "1940",
        "1940",
        "1940",
        "1960",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1950",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1960",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1970",
        "1960"
    );
    musicYoutube.push(
        "https://www.youtube.com/watch?v=rIwiru6J7gY",
        "https://www.youtube.com/watch?v=w9QLn7gM-hY",
        "https://www.youtube.com/watch?v=a9CKSLG5cck",
        "https://www.youtube.com/watch?v=7h8fHZFlxSE",
        "https://www.youtube.com/watch?v=7heXZPl2hik",
        "https://www.youtube.com/watch?v=MiPUv4kXzvw",
        "https://www.youtube.com/watch?v=d5aeClRY4kA",
        "https://www.youtube.com/watch?v=9l44_n60QQ8",
        "https://www.youtube.com/watch?v=KwHH5cF4Fg8",
        "https://www.youtube.com/watch?v=0f48fpoSEPU",
        "https://www.youtube.com/watch?v=p6byr0PBF8k",
        "https://www.youtube.com/watch?v=UeRSqekHh1g",
        "https://www.youtube.com/watch?v=lXYKGL6MgKM",
        "https://www.youtube.com/watch?v=_VJlHWESyLI",
        "https://www.youtube.com/watch?v=6Tou8-Cz8is",
        "https://www.youtube.com/watch?v=Q66yTkrzosI",
        "https://www.youtube.com/watch?v=GUVT1NZtZPo",
        "https://www.youtube.com/watch?v=zQfF84ackMM",
        "https://www.youtube.com/watch?v=2C7SzKv2uLU",
        "https://www.youtube.com/watch?v=ah637P0_cts",
        "https://www.youtube.com/watch?v=SqLGoAFUJ9I",
        "https://www.youtube.com/watch?v=xZbKHDPPrrc",
        "https://www.youtube.com/watch?v=qiiyq2xrSI0",
        "https://www.youtube.com/watch?v=aiueIiFJdN8",
        "https://www.youtube.com/watch?v=O6PZvj49IuM",
        "https://www.youtube.com/watch?v=8bL2BCiFkTk",
        "https://www.youtube.com/watch?v=HMcHbh6HBDk",
        "https://www.youtube.com/watch?v=vDN5rG3wLa4",
        "https://www.youtube.com/watch?v=LX95xseMRuc",
        "https://www.youtube.com/watch?v=nknJejG_wLE",
        "https://www.youtube.com/watch?v=A2jh43Od0kE",
        "https://www.youtube.com/watch?v=_rR0trsOUaY",
        "https://www.youtube.com/watch?v=eTABp5dWQrg",
        "https://www.youtube.com/watch?v=L_jgIezosVA",
        "https://www.youtube.com/watch?v=8rjPC7-JMUM",
        "https://www.youtube.com/watch?v=gAdTsAKvVTU",
        "https://www.youtube.com/watch?v=2IHBguvQlis",
        "https://www.youtube.com/watch?v=8HIHdCJA8f8",
        "https://www.youtube.com/watch?v=ny2yqpCKDkc",
        "https://www.youtube.com/watch?v=qUlOyj9F5gM",
        "https://www.youtube.com/watch?v=jBupII3LH_Q",
        "https://www.youtube.com/watch?v=1o_5z6-OIPY",
        "https://www.youtube.com/watch?v=aUaO50nWnvg",
        "https://www.youtube.com/watch?v=G3-tdrPkY7w",
        "https://www.youtube.com/watch?v=8bmbSC9c2ys",
        "https://www.youtube.com/watch?v=n-XQ26KePUQ",
        "https://www.youtube.com/watch?v=b1z4JfxFb6c",
        "https://www.youtube.com/watch?v=RBHZFYpQ6nc",
        "https://www.youtube.com/watch?v=BkEPBiMbgxs",
        "https://www.youtube.com/watch?v=A_MjCqQoLLA",
        "https://www.youtube.com/watch?v=GMcdU_cATYM",
        "https://www.youtube.com/watch?v=78MKBHR3NbU",
        "https://www.youtube.com/watch?v=5tc0gLSSU1M",
        "https://www.youtube.com/watch?v=ceWKrsJX9N4",
        "https://www.youtube.com/watch?v=aDqqm_gTPjc",
        "https://www.youtube.com/watch?v=DwBirf4BWew",
        "https://www.youtube.com/watch?v=LFOvehpV13I",
        "https://www.youtube.com/watch?v=E6n-UQ9k8rI",
        "https://www.youtube.com/watch?v=PigMNwgufmk",
        "https://www.youtube.com/watch?v=8T4Uk7mDR-w",
        "https://www.youtube.com/watch?v=mC6l7ypNqKA",
        "https://www.youtube.com/watch?v=VMUz2TNMvL0",
        "https://www.youtube.com/watch?v=ODqj9Mq39FM",
        "https://www.youtube.com/watch?v=xAAiYMgFcbw",
        "https://www.youtube.com/watch?v=q6yyWKzPBCM",
        "https://www.youtube.com/watch?v=Grufdzz3m08",
        "https://www.youtube.com/watch?v=NAtwI2poXXg",
        "https://www.youtube.com/watch?v=ihYHTIwISV0",
        "https://www.youtube.com/watch?v=IZr6AE-u2UM",
        "https://www.youtube.com/watch?v=XpqqjU7u5Yc",
        "https://www.youtube.com/watch?v=oxHnRfhDmrk",
        "https://www.youtube.com/watch?v=6_ndC07C2qw",
        "https://www.youtube.com/watch?v=OV5_LQArLa0"
    );
    musicSpotify.push(
        "https://open.spotify.com/track/4WtcRn4eeZYEGjMSiKr2x4",
        "https://open.spotify.com/track/4so0Wek9Ig1p6CRCHuINwW",
        "https://open.spotify.com/track/5o4SqGekEfvdkNuOVx5d3S",
        "https://open.spotify.com/track/5zV8YvnuVTNBwHsY8uKZKb",
        "https://open.spotify.com/track/3CWuj2ONceoOTYFMRZOZxq",
        "https://open.spotify.com/track/0Hsc0sIaxOxXBZbT3ms2oj",
        "https://open.spotify.com/track/5JWtDEeabV5pQLiJskKkSe",
        "https://open.spotify.com/track/4smkJW6uzoHxGReZqqwHS5",
        "https://open.spotify.com/track/46N9AdcYFpDfkJD01P4jh1",
        "https://open.spotify.com/search",
        "https://open.spotify.com/track/77rto0aPdnGCtYqmt0ONnH",
        "https://open.spotify.com/track/5VxQHst22Vntx2qz2TeQmf",
        "https://open.spotify.com/track/0YUsHYHiwi6drC1ATz47hm",
        "https://open.spotify.com/track/1pBJCt9keWDrIQYu51T6py",
        "https://open.spotify.com/track/43IKDWv0QrE1fl2mwWj9qw",
        "https://open.spotify.com/track/2gGdbqJ2ceiYn96dlMYMSK",
        "https://open.spotify.com/track/0UsdtLayy7SqJ4rUsDMRk8",
        "https://open.spotify.com/track/3xZe0jFAwc3akvChOrPS7u",
        "https://open.spotify.com/track/1rrlI3Px1kr7m41bcSK2ak",
        "https://open.spotify.com/track/5OkKOkdVTKFrYi6GWXkMzR",
        "https://open.spotify.com/track/4golQxL2SXRPBXQQ38IkH5",
        "https://open.spotify.com/track/3VR53EGdIj60lrwamMs0RR",
        "https://open.spotify.com/track/2qhASBzpbFhPRtrnZ5lLnz",
        "https://open.spotify.com/track/5wzjc23Qsn7wN75eLMvFEc",
        "https://open.spotify.com/track/4FaI40bUHwgDJV2udWkoVE",
        "https://open.spotify.com/track/2a6v5EnyYJEopa3y7UUaOm",
        "https://open.spotify.com/search",
        "https://open.spotify.com/track/648TTtYB0bH0P8Hfy0FmkL",
        "https://open.spotify.com/track/2JWDwMesYlNYq9azDcbzc7",
        "https://open.spotify.com/track/7fAEwKP7jLFScrn2aSJyFQ",
        "https://open.spotify.com/track/7MtGayFiDns1egbyaFQKaE",
        "https://open.spotify.com/track/7yrAJDi3c35byX8HdtBSJM",
        "https://open.spotify.com/track/3bCRsaMgyNJKCkuIoKAW0Y",
        "https://open.spotify.com/track/71kwIDWJ0xClRjxvIey6D0",
        "https://open.spotify.com/track/0qYok0f8O5DE8yJSo146dn",
        "https://open.spotify.com/track/4NAbnwBxeiFY714TBr3zBJ",
        "https://open.spotify.com/track/53ibmvBT2PXgWkD127FJG7",
        "https://open.spotify.com/track/77RGXccaKCPp3sLlP5eOOR",
        "https://open.spotify.com/track/1xVOttVNT27FBTD8iHjOfU",
        "https://open.spotify.com/track/7Gpx2fNJiilvrf9Ss8qbit",
        "https://open.spotify.com/track/1QPRmX2e3EZWskuOe5QqxM",
        "https://open.spotify.com/track/0CxWbbbU0PB7ccm6CgHnrf",
        "https://open.spotify.com/track/4skknrc3sJqaPTtUr2cwFq",
        "https://open.spotify.com/track/6iFYsQckCCtGsabW0rXEPn",
        "https://open.spotify.com/track/2ttQvh0eChNCF4JCBjH0li",
        "https://open.spotify.com/track/391TUcoPonqYykPkSZ5Z9U",
        "https://open.spotify.com/track/0eaDPjRdYhDoRWQfsoc1em",
        "https://open.spotify.com/track/6WmgZ4B9raZDq3lms0e6SZ",
        "https://open.spotify.com/track/1Eolhana7nKHYpcYpdVcT5",
        "https://open.spotify.com/track/1eT2CjXwFXNx6oY5ydvzKU",
        "https://open.spotify.com/track/6qX2NVcYsuTNEHnrYSVbQl",
        "https://open.spotify.com/search",
        "https://open.spotify.com/track/65vdMBskhx3akkG9vQlSH1",
        "https://open.spotify.com/track/0ZvsBTqdcOKdvQSV11YG9V",
        "https://open.spotify.com/track/6nRvgo4ySezQKD1D7NIqAu",
        "https://open.spotify.com/track/2Cb2l4UoXynCHCeCYHRZN8",
        "https://open.spotify.com/track/5aUEwE5Ta7RpsUcbhUKM9a",
        "https://open.spotify.com/track/6Qm0WO5i1KH7n4SRbpY5wT",
        "https://open.spotify.com/track/7mzvbidIxAS6aRsdSawznI",
        "https://open.spotify.com/track/3qq7parQQaohn9N7qKrKtE",
        "https://open.spotify.com/track/39iKJpLPhsDTOzH2lXliWF",
        "https://open.spotify.com/track/1N0ChshCrLh8qqD3yWsg72",
        "https://open.spotify.com/track/7tlvuoydFHFO12oZl5buh0",
        "https://open.spotify.com/track/28W5lTZMClVz9fLt6iiaJN",
        "https://open.spotify.com/track/02BsTeJE4q5gWOTt58ur5U",
        "https://open.spotify.com/track/2iTpAjIM15wHKpV36xKG1e",
        "https://open.spotify.com/track/2Y7A6mOC5Qtco2gpDGGM7g",
        "https://open.spotify.com/track/6B0Tw3hiQyOkQLXuMC07fl",
        "https://open.spotify.com/track/10LRRKPmx8uHcSxLVWK0ct",
        "https://open.spotify.com/track/2JoZzpdeP2G6Csfdq5aLXP",
        "https://open.spotify.com/track/0VNzEY1G4GLqcNx5qaaTl6",
        "https://open.spotify.com/track/6n4ouTVjyXG9ZbDLtEryQi",
        "https://open.spotify.com/track/6catF1lDhNTjjGa2GxRQNN"
    );
    for(arrayLimit = 0; arrayLimit < musicTitle.length; arrayLimit++){
        $('#popTable tbody').append('<tr><td>'+musicTitle[arrayLimit]+'</td><td>'+musicComposer[arrayLimit]+'</td><td class="text-center align-middle">'+musicDuration[arrayLimit]+'</td><td class="text-center align-middle">'+musicBPM[arrayLimit]+'</td><td class="text-center align-middle">'+musicDecade[arrayLimit]+'</td><td class="text-center align-middle"><a href="'+musicYoutube[arrayLimit]+'" target="_blank"><img src="img/yt_play.png" style="height: 30%"></a></td><td class="text-center align-middle"><a href="'+musicSpotify[arrayLimit]+'" target="_blank"><img src="img/spotify_play.png" style="height: 15%"></a></td></tr>');
    }
}
