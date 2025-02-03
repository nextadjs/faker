export default `<VAST version="4.2" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.iab.com/VAST">
  <Ad id="20001" sequence="1" >
    <InLine>
      <AdSystem version="1">iabtechlab</AdSystem>
      <Error><![CDATA[https://example.com/error]]></Error>
      <Extensions>
        <Extension type="iab-Count">
          <total_available>
            <![CDATA[ 2 ]]>
          </total_available>
        </Extension>
      </Extensions>
      <Impression id="Impression-ID"><![CDATA[https://example.com/track/impression]]></Impression>
      <Pricing model="cpm" currency="USD">
        <![CDATA[ 25.00 ]]>
      </Pricing>
      <AdServingId>a532d16d-4d7f-4440-bd29-2ec0e693fc83</AdServingId>
      <AdTitle>iabtechlab video ad</AdTitle>
      <Creatives>
        <Creative id="5480" sequence="1" adId="2447226">
          <Linear>
            <TrackingEvents>
              <Tracking event="start" ><![CDATA[https://example.com/tracking/start]]></Tracking>
              <Tracking event="progress" offset="00:00:10"><![CDATA[http://example.com/tracking/progress-10]]></Tracking>
              <Tracking event="firstQuartile"><![CDATA[https://example.com/tracking/firstQuartile]]></Tracking>
              <Tracking event="midpoint"><![CDATA[https://example.com/tracking/midpoint]]></Tracking>
              <Tracking event="thirdQuartile"><![CDATA[https://example.com/tracking/thirdQuartile]]></Tracking>
              <Tracking event="complete"><![CDATA[https://example.com/tracking/complete]]></Tracking>
            </TrackingEvents>
            <Duration>00:00:16</Duration>
            <MediaFiles>
              <ClosedCaptionFiles>
                <ClosedCaptionFile type="text/srt"  language="en">
                  <![CDATA[https://mycdn.example.com/creatives/creative001.srt]]>
                </ClosedCaptionFile>
                <ClosedCaptionFile type="text/srt" language="fr">
                  <![CDATA[https://mycdn.example.com/creatives/creative001-1.srt]]>
                </ClosedCaptionFile>
                <ClosedCaptionFile type="text/vtt"   language="zh-TW">
                  <![CDATA[https://mycdn.example.com/creatives/creative001.vtt]]>
                </ClosedCaptionFile>
                <ClosedCaptionFile type="application/ttml+xml"  language="zh-CH">
                  <![CDATA[https://mycdn.example.com/creatives/creative001.ttml]]>
                </ClosedCaptionFile>
              </ClosedCaptionFiles>
              <MediaFile id="5241" delivery="progressive" type="video/mp4" bitrate="2000" width="1280" height="720" minBitrate="1500" maxBitrate="2500" scalable="1" maintainAspectRatio="1" codec="H.264">
                <![CDATA[https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro.mp4]]>
              </MediaFile>
              <MediaFile id="5244" delivery="progressive" type="video/mp4" bitrate="1000" width="854" height="480" minBitrate="700" maxBitrate="1500" scalable="1" maintainAspectRatio="1" codec="H.264">
                <![CDATA[https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro-mid-resolution.mp4]]>
              </MediaFile>
              <MediaFile id="5246" delivery="progressive" type="video/mp4" bitrate="600" width="640" height="360" minBitrate="500" maxBitrate="700" scalable="1" maintainAspectRatio="1" codec="H.264">
                <![CDATA[https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro-low-resolution.mp4]]>
              </MediaFile>
            </MediaFiles>
            <VideoClicks>
              <ClickThrough id="blog">
                <![CDATA[https://iabtechlab.com]]>
              </ClickThrough>
            </VideoClicks>
          </Linear>
          <UniversalAdId idRegistry="Ad-ID" >8465</UniversalAdId>
        </Creative>
      </Creatives>
    </InLine>
  </Ad>
</VAST>`;
