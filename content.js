InboxSDK.load('1', 'sdk_pipedrive-deal_df55dfb891').then(function(sdk){


	sdk.Conversations.registerThreadViewHandler(function(threadView){


		var messages = threadView.getMessageViewsAll();
		var recipient = null;
		var deals = [];
		console.log("got messages:", messages);
		for (var i = messages.length - 1; i >= 0; i--) {
			var recipients = messages[i].getRecipients();
			for (var j = recipients.length - 1; j >= 0; j--) {
				recipient = recipients[j];

				if (   recipient.emailAddress.indexOf("@pipedrivemail.com")>0
					&& recipient.emailAddress.indexOf("+deal")>0) {
					// get everything up till @
					var deal = recipient.emailAddress.slice(
						0,
						recipient.emailAddress.indexOf("@")
					)
					deals.push(deal);
				}
			}
		}

		// remove duplicates
		deals_uniq = [];
		deals.forEach(function(item) {
		     if(deals_uniq.indexOf(item) < 0) {
		         deals_uniq.push(item);
		     }
		});

		if (deals_uniq.length) {
			var el = document.createElement("div");
			var innerHTML = "";
			for (var i = deals_uniq.length - 1; i >= 0; i--) {
				var deal = deals_uniq[i];
				var dealid = escape(deal.slice(deal.indexOf("+deal")+5));
				var dealcust = escape(deal.slice(0,deal.indexOf("+")));
				innerHTML+= "<a target='_blank' href='https://"+dealcust+".pipedrive.com/deal/"+dealid+"'>Deal "+dealid+"</a><br/>";
			}
			el.innerHTML = innerHTML;


			threadView.addSidebarContentPanel({
				title: 'Pipedrive Deals',
				el: el
			});
		}

	});

});
