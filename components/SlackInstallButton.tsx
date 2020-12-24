export interface SlackInstallButtonProps {
	className?: string
}

const SlackInstallButton = ({ className }: SlackInstallButtonProps) => (
	<a className={className} href={process.env.NEXT_PUBLIC_SLACK_INSTALL_URL} rel="noopener noreferrer" target="_blank">
		<img
			src="https://platform.slack-edge.com/img/add_to_slack.png"
			srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
			alt="Add to Slack"
			height={40}
			width={139}
		/>
	</a>
)

export default SlackInstallButton
