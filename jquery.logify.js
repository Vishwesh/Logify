/**
 * Login plugin
 *
 * Copyright (c) 2010 T Vishwesh Prabhu (vish_last@yahoo.co.in && www.visu.co.nr)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a Login panel with configurable parameters.
 *
 * @example 				$.logify({url : 'http://www.google.com'});
 * @desc 				Set the url for requesting username and password authentication.
 * @param Object option 		An object literal containing key/value pairs to provide optional login panel configuration attributes.
 * @option String URL 			The url which would be called when login button is pressed. 
 * 					An Ajax call will be made using POST method. The parameters would be
 *					uname for User Name and password for Password
 * @option String usernameparam		Yet to be implmented. The username will be sent as this parameter in the call to the URL.
 * @option String passwordparam		Yet to be implmented. The password will be sent as this parameter in the call to the URL.
 * @option Function onSuccess		On successful return from the URL this function will be executed.
 * @option String headertext		Header strip will display this text.
 * @option String usernametext		User Name text 
 * @option String passwordtext		Password Text
 * @option String showpasstext		Show Password Check Box Text
 * @option String remembermetext	Remember Me Check Box Text
 * @option String logmebuttontext	Login Button Text
 * @option String unameemptyerrmsg	Error Message when User Name is empty
 * @option String passworderrmsg	Error Message when Password is empty
 * @option String panellockederrmsg	Error Message when Panel is locked and we try to close it.
 * @option String view          	Whether the panel is open,closed or locked.
 *
 * @type 				undefined
 *
 * @name 				$.logify
 * @cat 				Plugins/Login
 * @author 				T Vishwesh Prabhu(vish_last@yahoo.co.in && www.visu.co.nr)
 */

/**
 * The Cookie feature is based on Klaus Hartl/klaus.hartl@stilbuero.de Cookie Plugin. 
 * All credits to him for the Cookies
 */

(function($){

 	$.fn.extend({

 		logify: function(options) {   
              		//Set the default values, use comma to separate the settings, example:   
           		 var defaults = { 
           		 	url:"http://www.google.com",
//Yet to be implmented          usernameparam: "uname",
//Yet to be implmented      	passwordparam: "password",
           		 	onSuccess: function(){alert("hi")},
           		 	headertext: "Login",
           		 	usernametext: "User Name",
           		 	passwordtext: "Password",
           		 	showpasstext: "Show Password",
           		 	remembermetext: "Remember Me",
           		 	logmebuttontext: "Log me in.",
           		 	unameerrmsg: "User Name field is Empty.",
           		 	pwderrmsg: "Password field is Empty.",
           		 	pnllckerrmsg: "Panel is Locked.",
                                view:"closed"
            	               }   
                   
            		var options =  $.extend(defaults, options); 

    			return this.each(function() {
    				var o = options;
    				var passcontent="";
    				var passfield="";
    				var txtfield=""; 
    				var lock=0;
				var emptyoptions = {};				
                                var firsttime=0;
				
				
				$(this).html("<div class='login-panel'><div  class='login-panel-strip'></div>");
				$(this).html(this.innerHTML+"<center><div class='login-panel-content'><table><tr><td class='usernamecl'></td><td><input type='text' class='txtuname'/></td></tr><tr><td class='passwordcl'></td><td><input type='password' class='txtpassword'/></td></tr><tr><td style='text-align:right'><input type='checkbox' class='chkshwpass'></td><td class='showpasscl'></td></tr><tr><td style='text-align:right'><input type='checkbox' class='chkrem'></td><td class='remembermecl'></td></tr><tr><td colspan=2 style='text-align:center'><input type='submit' class='txtok'/></td></tr></table></div></center></div>");

				$(".txtok").button();
				$(".login-panel-strip").addClass("ui-widget")
						       .addClass("ui-corner-all");
				$(".login-panel-strip").addClass("ui-widget-header");
				$(".login-panel-content").addClass("ui-widget-content")
					.addClass("ui-corner-all")
					.prepend('<span class="ui-icon ui-icon-unlocked"></span>')
					.prepend('<span class="ui-icon ui-icon-closethick"></span>')
					.end();
                                $(".login-panel-content").toggle();
                                

				$(".login-panel-content").css("width","login-panel-content-width");
				$(".login-panel-strip").html(o.headertext);
				$(".usernamecl").html(o.usernametext);
				$(".passwordcl").html(o.passwordtext);
				$(".showpasscl").html(o.showpasstext);
				$(".remembermecl").html(o.remembermetext);
				$(".txtok").val(o.logmebuttontext);
				
				passfield = $('.txtpassword');
				txtfield = $("<input type='text' class='txtpassword'>");
				txtfield.insertAfter(passfield);
				txtfield.hide();
				
				if(jQuery().virtualkey)
				{
					passfield.virtualkey({});
				}
				
				
				var contentwidth =$('.login-panel').width();
				$(".login-panel-content").width(contentwidth);				
				
				
				if(jQuery.cookie)
				{
					var unamecki = $.cookie("uname");
					var passwordcki = $.cookie("password");					
				}
				else
				{
					$(".remembermecl").hide();
					$(".chkrem").hide();
				}

                                if(o.view.toString().toLowerCase() == "locked"){
                                    lock=1;
                                }
                                
				$('.login-panel-strip').click(function(){
					if(lock == 0 )
					{
						if($('.chkrem').is(":checked") == false)
						{
							$("input:text").val("");
							$("input:password").val("");
						}
						if (unamecki && unamecki != '' && passwordcki && passwordcki != '')
						{
						 	$('.txtuname').val(unamecki);
						 	$('.txtpassword').val(passwordcki);						 	
						 	$('.chkrem').attr('checked','checked');
                	        		}

						$(".login-panel-content").toggle('drop',{ direction: 'up' },500);
					}
				}); 
                	    	$(".login-panel-content .ui-icon").hover(function() {                    		
				        if($(this).is(".ui-icon-closethick")){
				              if(lock == 1){
				              	alert(o.pnllckerrmsg);
				              }
                	    		}
                	    	},function(){});
                                
                	    	$(".login-panel-content .ui-icon").click(function() {
                                    if( o.view.toString().toLowerCase() == "open" && firsttime==0){
                                        $(".login-panel-content").css("position","relative");
                                        firsttime =1;
                                    }
                                        if($(this).is(".ui-icon-closethick")){
                	    			if(lock == 0)
						{
							$(".login-panel-content").toggle('drop',{ direction: 'up' },500);
						}
						else
						{
							alert(o.pnllckerrmsg);
						}
						return;
                	    		}
                                        if($(".login-panel-content").find(".ui-icon").is(".ui-icon-unlocked"))
                	    		{
                	    			$(".login-panel-content").css("position","relative");
                			        $(this).toggleClass("ui-icon-unlocked").toggleClass("ui-icon-locked");
                	    			lock = 1;
                                                
                	   		}
                	   		else if($(".login-panel-content").find(".ui-icon").is(".ui-icon-locked"))
					{
						$(".login-panel-content").css("position","absolute");
						$(this).toggleClass("ui-icon-locked").toggleClass("ui-icon-unlocked");
						lock = 0;							
                	    		}  
                 	    	});  


				
				$('.txtok').click(function(event) {	
					if($('.txtuname').val() == '')
					{
						alert(o.unameerrmsg);												
					}
					else if($('.txtpassword').val() == '')
					{
						alert(o.pwderrmsg);						
					}
					else
					{
                                            var urlcall = o.url+"?uname="+$('.txtuname').val()+"&password="+$('.txtpassword').val();
						$.ajax({
							url: urlcall, 
                        				success: function(data) {                                                            
						            o.onSuccess(data);
							}
                    				});
					}
					return false;
				}); 

				$('.chkshwpass').click(function(event) {	
					if($('.chkshwpass').is(":checked"))
					{	
						passcontent = $(passfield).val();
						txtfield.val(passcontent);
						$(passfield).hide();
						$(txtfield).show();
						if(jQuery().virtualkey)
						{
							passfield.virtualkey({action:'hide'});
						}
					}
					else
					{	
						passcontent = $(txtfield).val();
						passfield.val(passcontent);
						$(txtfield).hide();
						$(passfield).show();
						if(jQuery().virtualkey)
						{
							passfield.virtualkey({});
						}
					}

				});

				$('.chkrem').click(function(event) {	
					if($('.chkrem').is(":checked"))
					{	
						if($('.txtuname').val() == '')
						{
							alert(o.unameerrmsg);
							$('.chkrem').removeAttr('checked');						
						}
						else if($('.txtpassword').val() == '')
						{
							alert(o.pwderrmsg);
							$('.chkrem').removeAttr('checked');
						}
						else
						{
							$.cookie("uname",$('.txtuname').val(), { expires: 365 });
							$.cookie("password",$('.txtpassword').val(), { expires: 365 });
							alert("Cookie saved");	
						}
					}
					else
					{
						$.cookie("uname",null);
						$.cookie("password",null);
						$('.txtuname').val('');
						$('.txtpassword').val('');
						unamecki='';
						passwordcki='';
						alert("Cookie deleted");	
					}

				});


				$('#login-panel-content input:text,input:password').focus(function(event){
					$(this).animate({backgroundColor: '#8181F7', width : '200px'}, 500);
				});

				$('#login-panel-content input:text,input:password').focusout(function(event){
					$(this).animate({backgroundColor: '#FFFFFF', width : '150px'}, 500);
				});

                               if(o.view == "open"){
                                   $(".login-panel-content .ui-icon").click();
                                }
				 
    			});
    		}  
	});
})(jQuery); 